import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const repair = await prisma.bicycleRepair.findUnique({
      where: {
          id: id
      },
      include: {
        partsUsed: {
          include: {
            part: true
          }
        }
      }
    })

    if (!repair) {
      return NextResponse.json(
        { error: "Repair not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(repair)
  } catch (error) {
    console.error("Error fetching repair:", error)
    return NextResponse.json(
      { error: "Failed to fetch repair" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Extract only the fields that can be updated
    const updateData: any = {};
    
    if (body.ownerPhone !== undefined) updateData.ownerPhone = body.ownerPhone;
    
    // Handle date fields safely
    if (body.receivedDate !== undefined) {
      try {
        updateData.receivedDate = new Date(body.receivedDate);
      } catch (error) {
        console.error("Error parsing receivedDate:", error);
        return NextResponse.json(
          { error: "Invalid receivedDate format" },
          { status: 400 }
        );
      }
    }
    
    if (body.repairedDate !== undefined) {
      if (body.repairedDate === null) {
        updateData.repairedDate = null;
      } else {
        try {
          updateData.repairedDate = new Date(body.repairedDate);
        } catch (error) {
          console.error("Error parsing repairedDate:", error);
          return NextResponse.json(
            { error: "Invalid repairedDate format" },
            { status: 400 }
          );
        }
      }
    }
    
    if (body.pickupDate !== undefined) {
      if (body.pickupDate === null) {
        updateData.pickupDate = null;
      } else {
        try {
          updateData.pickupDate = new Date(body.pickupDate);
        } catch (error) {
          console.error("Error parsing pickupDate:", error);
          return NextResponse.json(
            { error: "Invalid pickupDate format" },
            { status: 400 }
          );
        }
      }
    }
    
    if (body.status !== undefined) updateData.status = body.status;
    
    // Update the repair
    const updatedRepair = await prisma.bicycleRepair.update({
      where: {
        id: id
      },
      data: updateData,
      include: {
        partsUsed: {
          include: {
            part: true
          }
        }
      }
    });

    return NextResponse.json(updatedRepair);
  } catch (error) {
    console.error("Error updating repair:", error);
    return NextResponse.json(
      { error: "Failed to update repair" },
      { status: 500 }
    );
  }
} 
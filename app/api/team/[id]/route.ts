import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GoogleWorkspaceService } from "@/app/services/google-workspace";
import { requireAdmin } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireAdmin(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    if (
      !body.familyName ||
      !body.givenNames ||
      !body.startDate ||
      !body.department ||
      !body.email ||
      !body.secondaryEmail ||
      !body.phone ||
      !body.dateOfBirth
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingTeamMember = await prisma.teamMember.findUnique({
      where: { id },
    });

    if (!existingTeamMember) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    const updatedTeamMember = await prisma.teamMember.update({
      where: { id },
      data: {
        familyName: body.familyName,
        givenNames: body.givenNames,
        nationality: body.nationality || null,
        photoPath: body.photoPath || null,
        status: body.status || "ACTIVE",
        googleAccountActive: body.googleAccountActive ?? true,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        department: body.department,
        email: body.email,
        secondaryEmail: body.secondaryEmail,
        phone: body.phone,
        homeAddress: body.homeAddress || null,
        dateOfBirth: new Date(body.dateOfBirth),
        legalStatus: body.legalStatus || null,
        vaccinationCertificate: body.vaccinationCertificate || null,
        liabilityInsurance: body.liabilityInsurance ?? null,
        accidentInsurance: body.accidentInsurance ?? null,
        testCertificate: body.testCertificate || null,
        livesInCamp: body.livesInCamp ?? null,
        legalSupportStatus: body.legalSupportStatus || null,
        legalSupportComment: body.legalSupportComment || null,
        powerToolClearanceWood: body.powerToolClearanceWood ?? null,
        powerToolClearanceMetal: body.powerToolClearanceMetal ?? null,
        weldingClearance: body.weldingClearance ?? null,
        handToolsClearance: body.handToolsClearance ?? null,
        toolLiabilityWaiverSigned: body.toolLiabilityWaiverSigned ?? null,
        vaccinationComment: body.vaccinationComment || null,
        driversLicenseCar: body.driversLicenseCar ?? null,
        registeredForMakerspaceVan: body.registeredForMakerspaceVan ?? null,
        registeredForOhfVan: body.registeredForOhfVan ?? null,
        codeOfConductSigned: body.codeOfConductSigned ?? null,
        safeguardingPolicySigned: body.safeguardingPolicySigned ?? null,
        codeOfConductSignedAttachment: body.codeOfConductSignedAttachment || null,
        codeOfConductSigningDate: body.codeOfConductSigningDate
          ? new Date(body.codeOfConductSigningDate)
          : null,
        safeguardingPolicySigningDate: body.safeguardingPolicySigningDate
          ? new Date(body.safeguardingPolicySigningDate)
          : null,
        keys: body.keys || null,
        fireSafetyTraining: body.fireSafetyTraining ?? null,
        firstAidTraining: body.firstAidTraining ?? null,
        safetyTraining: body.safetyTraining ?? null,
        cardNumber: body.cardNumber || null,
        toolLiabilityWaiverSignedAttachment:
          body.toolLiabilityWaiverSignedAttachment || null,
        toolLiabilityWaiverSigningDate: body.toolLiabilityWaiverSigningDate
          ? new Date(body.toolLiabilityWaiverSigningDate)
          : null,
      },
    });

    if (existingTeamMember.email !== updatedTeamMember.email) {
      await prisma.user.updateMany({
        where: { email: existingTeamMember.email },
        data: { email: updatedTeamMember.email },
      });
    }

    try {
      const googleWorkspace = await GoogleWorkspaceService.getInstance();
      await googleWorkspace.updateUser(updatedTeamMember, existingTeamMember.email);

      if (existingTeamMember.googleAccountActive !== updatedTeamMember.googleAccountActive) {
        if (updatedTeamMember.googleAccountActive) {
          await googleWorkspace.reactivateUser(updatedTeamMember.email);
        } else {
          await googleWorkspace.suspendUser(updatedTeamMember.email);
        }
      }
    } catch (googleError) {
      console.error("Error updating Google Workspace user:", googleError);
    }

    return NextResponse.json(updatedTeamMember);
  } catch (error) {
    console.error("Error updating team member:", error);
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireAdmin(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const teamMember = await prisma.teamMember.findUnique({
      where: { id },
    });

    if (!teamMember) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    try {
      const googleWorkspace = await GoogleWorkspaceService.getInstance();
      await googleWorkspace.deleteUser(teamMember.email);
    } catch (googleError) {
      console.error("Error deleting Google Workspace user:", googleError);
    }

    await prisma.teamMember.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting team member:", error);
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}

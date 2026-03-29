import { BackButton } from "@/components/BackButton";
import { prisma } from "@/lib/prisma";
import { getServerI18n } from "@/lib/i18n/server";
import { notFound } from "next/navigation";
import { RentalDetails } from "./rental-details";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BicycleRentalDetailsPage({ params }: PageProps) {
  const { t } = await getServerI18n();
  const rental = await prisma.bicycleRental.findUnique({
    where: {
      id: (await params).id,
    },
  });

  if (!rental) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-10">
      <div className="mb-6 flex items-center gap-4">
        <BackButton />
        <h1 className="text-2xl font-bold">
          {t("rentals.details.pageTitle", "Bicycle Rental Details")}
        </h1>
      </div>

      <RentalDetails rental={rental} />
    </div>
  );
}

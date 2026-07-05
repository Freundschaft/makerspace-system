import { BackButton } from "@/components/BackButton";
import { prisma } from "@/lib/prisma";
import { getServerI18n } from "@/lib/i18n/server";
import { notFound } from "next/navigation";
import { RentalDetails } from "./rental-details";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BicycleRentalDetailsPage({ params }: PageProps) {
  const { locale, t } = await getServerI18n();
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

      <RentalDetails
        rental={rental}
        locale={locale}
        labels={{
          renterInfo: t("rentals.details.renterInfo", "Renter Information"),
          renterInfoDesc: t("rentals.details.renterInfoDesc", "Contact details for the renter"),
          renterName: t("rentals.new.fields.renterName", "Renter Name"),
          phone: t("common.phone", "Phone"),
          email: t("common.email", "Email"),
          notProvided: t("common.notAvailable", "Not provided"),
          rentalInfo: t("rentals.details.rentalInfo", "Rental Information"),
          rentalInfoDesc: t("rentals.details.rentalInfoDesc", "Dates, bicycle, and return status"),
          bicycleId: t("rentals.new.fields.bicycleId", "Bicycle ID"),
          status: t("common.status", "Status"),
          startDate: t("rentals.new.fields.startDate", "Start Date"),
          endDate: t("rentals.new.fields.endDate", "End Date"),
          actualReturnDate: t("rentals.details.actualReturnDate", "Actual Return Date"),
          notReturned: t("rentals.details.notReturned", "Not returned yet"),
          notes: t("common.notes", "Notes"),
          bicyclePhoto: t("rentals.details.bicyclePhoto", "Bicycle Photo"),
          bicyclePhotoAlt: t("rentals.details.bicyclePhotoAlt", "Rented bicycle"),
          signature: t("rentals.details.signature", "Signature"),
          signatureAlt: t("rentals.details.signatureAlt", "Rental signature"),
          edit: t("common.edit", "Edit"),
          statusLabels: {
            [rental.status]: t(`rentals.statuses.${rental.status}`, rental.status),
          },
        }}
      />
    </div>
  );
}

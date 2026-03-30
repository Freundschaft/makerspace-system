import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { RentalForm } from "../../rental-form";
import { getServerI18n } from "@/lib/i18n/server";

interface EditRentalPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditRentalPage({ params }: EditRentalPageProps) {
  const { t } = await getServerI18n();
  const { id } = await params;

  const rental = await prisma.bicycleRental.findUnique({
    where: { id },
  });

  if (!rental) {
    notFound();
  }

  return (
    <div>
      <h1 className="sr-only">{t("rentals.edit.title", "Edit Bicycle Rental")}</h1>
      <RentalForm mode="edit" initialData={rental} />
    </div>
  );
}

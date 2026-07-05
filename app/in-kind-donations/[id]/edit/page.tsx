import { notFound } from "next/navigation";

import { getServerI18n } from "@/lib/i18n/server";
import { prisma } from "@/lib/prisma";
import { InKindDonationForm } from "../../new/in-kind-donation-form";

interface EditInKindDonationPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditInKindDonationPage({ params }: EditInKindDonationPageProps) {
  const { t } = await getServerI18n();
  const { id } = await params;

  const donation = await prisma.inKindDonation.findUnique({
    where: { id },
  });

  if (!donation) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {t("inKindDonations.edit.pageTitle", "Edit In-kind Donation")}
        </h1>
      </div>
      <InKindDonationForm
        mode="edit"
        donationId={donation.id}
        initialData={{
          direction: donation.direction,
          status: donation.status,
          date: donation.date,
          item: donation.item,
          quantity: donation.quantity ? Number(donation.quantity) : null,
          unit: donation.unit,
          contactName: donation.contactName,
          location: donation.location,
          estimatedValue: donation.estimatedValue ? Number(donation.estimatedValue) : null,
          notes: donation.notes,
        }}
      />
    </div>
  );
}

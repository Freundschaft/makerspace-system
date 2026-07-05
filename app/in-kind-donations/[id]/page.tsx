import { notFound } from "next/navigation";

import { BackButton } from "@/components/BackButton";
import { getServerI18n } from "@/lib/i18n/server";
import { prisma } from "@/lib/prisma";
import { InKindDonationDetails } from "./in-kind-donation-details";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InKindDonationDetailsPage({ params }: PageProps) {
  const { locale, t } = await getServerI18n();
  const donation = await prisma.inKindDonation.findUnique({
    where: {
      id: (await params).id,
    },
    include: { createdBy: true },
  });

  if (!donation) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-10">
      <div className="mb-6 flex items-center gap-4">
        <BackButton />
        <h1 className="text-2xl font-bold">
          {t("inKindDonations.details.pageTitle", "In-kind Donation Details")}
        </h1>
      </div>

      <InKindDonationDetails
        donation={donation}
        locale={locale}
        labels={{
          donationInfo: t("inKindDonations.details.donationInfo", "Donation Information"),
          item: t("inKindDonations.fields.item", "Item"),
          direction: t("inKindDonations.fields.direction", "Direction"),
          status: t("common.status", "Status"),
          date: t("inKindDonations.fields.date", "Date"),
          quantity: t("inKindDonations.fields.quantity", "Quantity"),
          contactName: t("inKindDonations.fields.contactName", "Donor / Recipient"),
          location: t("inKindDonations.fields.location", "Location"),
          estimatedValue: t("inKindDonations.fields.estimatedValue", "Estimated Value"),
          createdBy: t("inKindDonations.fields.createdBy", "Created By"),
          notes: t("common.notes", "Notes"),
          edit: t("common.edit", "Edit"),
          directionLabels: {
            [donation.direction]: t(`inKindDonations.directions.${donation.direction}`, donation.direction),
          },
          statusLabels: {
            [donation.status]: t(`inKindDonations.statuses.${donation.status}`, donation.status),
          },
        }}
      />
    </div>
  );
}

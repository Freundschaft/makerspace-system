import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { localizePathname } from "@/lib/i18n/config";
import { getServerI18n } from "@/lib/i18n/server";
import { prisma } from "@/lib/prisma";
import { InKindDonationsTable } from "./in-kind-donations-table";

export default async function InKindDonationsPage() {
  const { locale, t } = await getServerI18n();
  const donations = await prisma.inKindDonation.findMany({
    include: { createdBy: true },
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });

  const serializedDonations = donations.map((donation) => ({
    ...donation,
    quantity: donation.quantity ? Number(donation.quantity) : null,
    estimatedValue: donation.estimatedValue ? Number(donation.estimatedValue) : null,
    date: donation.date.toISOString(),
    createdAt: donation.createdAt.toISOString(),
    updatedAt: donation.updatedAt.toISOString(),
    createdBy: donation.createdBy
      ? {
          email: donation.createdBy.email,
        }
      : null,
  }));

  const incomingCount = donations.filter((donation) => donation.direction === "INCOMING").length;
  const outgoingCount = donations.filter((donation) => donation.direction === "OUTGOING").length;
  const openCount = donations.filter((donation) => donation.status === "PLANNED").length;

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-10">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
        <div>
          <h1 className="text-2xl font-bold">
            {t("modules.inKindDonations.title", "In-kind Donations")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t(
              "inKindDonations.description",
              "Track goods received by the makerspace and items distributed to people or partner teams."
            )}
          </p>
        </div>
        <Button asChild>
          <Link href={localizePathname("/in-kind-donations/new", locale)}>
            {t("modules.inKindDonations.new", "New Donation")}
          </Link>
        </Button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t("inKindDonations.summary.incoming", "Incoming")}</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{incomingCount}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("inKindDonations.summary.outgoing", "Outgoing")}</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{outgoingCount}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("inKindDonations.summary.planned", "Planned")}</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{openCount}</CardContent>
        </Card>
      </div>

      <InKindDonationsTable data={serializedDonations} />
    </div>
  );
}

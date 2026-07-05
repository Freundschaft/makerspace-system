import { format } from "date-fns";
import { Pencil } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InKindDonation, User } from "@/generated/prisma";
import { Locale, localizePathname } from "@/lib/i18n/config";

type DonationWithCreator = InKindDonation & {
  createdBy: Pick<User, "email"> | null;
};

interface InKindDonationDetailsProps {
  donation: DonationWithCreator;
  locale: Locale;
  labels: {
    donationInfo: string;
    item: string;
    direction: string;
    status: string;
    date: string;
    quantity: string;
    contactName: string;
    location: string;
    estimatedValue: string;
    createdBy: string;
    notes: string;
    edit: string;
    directionLabels: Record<string, string>;
    statusLabels: Record<string, string>;
  };
}

function formatQuantity(donation: DonationWithCreator) {
  if (!donation.quantity) {
    return "—";
  }

  const quantity = Number(donation.quantity);
  const formattedQuantity = Number.isInteger(quantity) ? quantity.toString() : quantity.toFixed(2);
  return donation.unit ? `${formattedQuantity} ${donation.unit}` : formattedQuantity;
}

export async function InKindDonationDetails({
  donation,
  locale,
  labels,
}: InKindDonationDetailsProps) {
  const editHref = localizePathname(`/in-kind-donations/${donation.id}/edit`, locale);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" asChild>
          <Link href={editHref}>
            <Pencil className="mr-2 h-4 w-4" />
            {labels.edit}
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{labels.donationInfo}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">{labels.item}:</div>
              <div>{donation.item}</div>

              <div className="font-medium">{labels.direction}:</div>
              <div>
                <Badge variant={donation.direction === "INCOMING" ? "default" : "secondary"}>
                  {labels.directionLabels[donation.direction] ?? donation.direction}
                </Badge>
              </div>

              <div className="font-medium">{labels.status}:</div>
              <div>
                <Badge variant={donation.status === "CANCELLED" ? "secondary" : "outline"}>
                  {labels.statusLabels[donation.status] ?? donation.status}
                </Badge>
              </div>

              <div className="font-medium">{labels.date}:</div>
              <div>{format(donation.date, "PPP")}</div>

              <div className="font-medium">{labels.quantity}:</div>
              <div>{formatQuantity(donation)}</div>

              <div className="font-medium">{labels.contactName}:</div>
              <div>{donation.contactName || "—"}</div>

              <div className="font-medium">{labels.location}:</div>
              <div>{donation.location || "—"}</div>

              <div className="font-medium">{labels.estimatedValue}:</div>
              <div>
                {donation.estimatedValue ? `€${Number(donation.estimatedValue).toFixed(2)}` : "—"}
              </div>

              <div className="font-medium">{labels.createdBy}:</div>
              <div>{donation.createdBy?.email || "—"}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{labels.notes}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{donation.notes || "—"}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

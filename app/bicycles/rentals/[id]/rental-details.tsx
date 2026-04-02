import Link from "next/link";
import Image from "next/image";
import { Edit } from "lucide-react";
import { BicycleRental } from "@/generated/prisma";
import { getServerI18n } from "@/lib/i18n/server";
import { localizePathname } from "@/lib/i18n/config";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RentalReturnActions } from "./RentalReturnActions";

interface RentalDetailsProps {
  rental: BicycleRental;
}

function getStatusVariant(status: BicycleRental["status"]) {
  switch (status) {
    case "ACTIVE":
      return "default";
    case "OVERDUE":
      return "destructive";
    case "RETURNED":
      return "secondary";
    default:
      return "outline";
  }
}

export async function RentalDetails({ rental }: RentalDetailsProps) {
  const { locale, t } = await getServerI18n();
  const editHref = localizePathname(`/bicycles/rentals/${rental.id}/edit`, locale);
  const canReturnBike = rental.status !== "RETURNED" && rental.status !== "CANCELLED";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("rentals.details.renterInfo", "Renter Information")}</CardTitle>
            <CardDescription>
              {t("rentals.details.renterInfoDesc", "Contact details for the renter")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">{t("rentals.new.fields.renterName", "Renter Name")}:</div>
              <div>{rental.renterName}</div>

              <div className="font-medium">{t("common.phone", "Phone")}:</div>
              <div>{rental.renterPhone}</div>

              <div className="font-medium">{t("common.email", "Email")}:</div>
              <div>{rental.renterEmail || t("common.notAvailable", "Not provided")}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("rentals.details.rentalInfo", "Rental Information")}</CardTitle>
            <CardDescription>
              {t("rentals.details.rentalInfoDesc", "Dates, bicycle, and return status")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">{t("rentals.new.fields.bicycleId", "Bicycle ID")}:</div>
              <div>{rental.bicycleId}</div>

              <div className="font-medium">{t("common.status", "Status")}:</div>
              <div>
                <Badge variant={getStatusVariant(rental.status)}>
                  {t(`rentals.statuses.${rental.status}`, rental.status)}
                </Badge>
              </div>

              <div className="font-medium">{t("rentals.new.fields.startDate", "Start Date")}:</div>
              <div>{formatDate(rental.startDate)}</div>

              <div className="font-medium">{t("rentals.new.fields.endDate", "End Date")}:</div>
              <div>{formatDate(rental.endDate)}</div>

              <div className="font-medium">
                {t("rentals.details.actualReturnDate", "Actual Return Date")}:
              </div>
              <div>
                {rental.actualReturnDate
                  ? formatDate(rental.actualReturnDate)
                  : t("rentals.details.notReturned", "Not returned yet")}
              </div>
            </div>
          </CardContent>
        </Card>

        {rental.notes && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t("common.notes", "Notes")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{rental.notes}</p>
            </CardContent>
          </Card>
        )}

        {rental.signature && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t("rentals.details.signature", "Signature")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={rental.signature}
                alt={t("rentals.details.signatureAlt", "Rental signature")}
                width={640}
                height={240}
                unoptimized
                className="max-h-64 h-auto rounded-lg border bg-white p-2"
              />
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex flex-wrap justify-end gap-2">
        <Button variant="outline" asChild>
          <Link href={editHref}>
            <Edit className="mr-2 h-4 w-4" />
            {t("common.edit", "Edit")}
          </Link>
        </Button>
        {canReturnBike ? <RentalReturnActions rentalId={rental.id} /> : null}
      </div>
    </div>
  );
}

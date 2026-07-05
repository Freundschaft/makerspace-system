import Link from "next/link";
import Image from "next/image";
import { Edit } from "lucide-react";
import { BicycleRental } from "@/generated/prisma";
import { Locale, localizePathname } from "@/lib/i18n/config";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RentalReturnActions } from "./RentalReturnActions";
import { toAbsoluteFileUrl } from "@/lib/file-urls";

interface RentalDetailsProps {
  rental: BicycleRental;
  locale: Locale;
  labels: {
    renterInfo: string;
    renterInfoDesc: string;
    renterName: string;
    phone: string;
    email: string;
    notProvided: string;
    rentalInfo: string;
    rentalInfoDesc: string;
    bicycleId: string;
    status: string;
    startDate: string;
    endDate: string;
    actualReturnDate: string;
    notReturned: string;
    notes: string;
    bicyclePhoto: string;
    bicyclePhotoAlt: string;
    signature: string;
    signatureAlt: string;
    edit: string;
    statusLabels: Record<string, string>;
  };
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

export async function RentalDetails({ rental, locale, labels }: RentalDetailsProps) {
  const editHref = localizePathname(`/bicycles/rentals/${rental.id}/edit`, locale);
  const canReturnBike = rental.status !== "RETURNED" && rental.status !== "CANCELLED";
  const photoUrl = toAbsoluteFileUrl(rental.photoPath);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {photoUrl ? (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{labels.bicyclePhoto}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border bg-muted sm:max-w-2xl">
                <Image
                  src={photoUrl}
                  alt={labels.bicyclePhotoAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>
        ) : null}

        <Card>
          <CardHeader>
            <CardTitle>{labels.renterInfo}</CardTitle>
            <CardDescription>
              {labels.renterInfoDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">{labels.renterName}:</div>
              <div>{rental.renterName}</div>

              <div className="font-medium">{labels.phone}:</div>
              <div>{rental.renterPhone}</div>

              <div className="font-medium">{labels.email}:</div>
              <div>{rental.renterEmail || labels.notProvided}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{labels.rentalInfo}</CardTitle>
            <CardDescription>
              {labels.rentalInfoDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">{labels.bicycleId}:</div>
              <div>{rental.bicycleId}</div>

              <div className="font-medium">{labels.status}:</div>
              <div>
                <Badge variant={getStatusVariant(rental.status)}>
                  {labels.statusLabels[rental.status] ?? rental.status}
                </Badge>
              </div>

              <div className="font-medium">{labels.startDate}:</div>
              <div>{formatDate(rental.startDate)}</div>

              <div className="font-medium">{labels.endDate}:</div>
              <div>{formatDate(rental.endDate)}</div>

              <div className="font-medium">
                {labels.actualReturnDate}:
              </div>
              <div>
                {rental.actualReturnDate
                  ? formatDate(rental.actualReturnDate)
                  : labels.notReturned}
              </div>
            </div>
          </CardContent>
        </Card>

        {rental.notes && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{labels.notes}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{rental.notes}</p>
            </CardContent>
          </Card>
        )}

        {rental.signature && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{labels.signature}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={rental.signature}
                alt={labels.signatureAlt}
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
            {labels.edit}
          </Link>
        </Button>
        {canReturnBike ? <RentalReturnActions rentalId={rental.id} /> : null}
      </div>
    </div>
  );
}

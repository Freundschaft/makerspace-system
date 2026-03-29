"use client";

import { useI18n } from "@/app/components/I18nProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BicycleRental } from "@/generated/prisma";
import { formatDate } from "@/lib/utils";
import { CheckCircle2, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export function RentalDetails({ rental }: RentalDetailsProps) {
  const { t } = useI18n();
  const router = useRouter();
  const [isReturning, setIsReturning] = useState(false);
  const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false);
  const [isBicycleChecked, setIsBicycleChecked] = useState(false);
  const [isDepositReturned, setIsDepositReturned] = useState(false);

  const canReturnBike = rental.status !== "RETURNED" && rental.status !== "CANCELLED";
  const isReturnChecklistComplete = isBicycleChecked && isDepositReturned;

  const handleReturnBike = async () => {
    setIsReturning(true);

    try {
      const response = await fetch(`/api/bicycles/rentals/${rental.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "return-bike",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to return bike");
      }

      setIsReturnDialogOpen(false);
      setIsBicycleChecked(false);
      setIsDepositReturned(false);
      router.refresh();
    } catch (error) {
      console.error("Error returning bike:", error);
      alert(t("rentals.details.returnBikeFailed", "Failed to return bicycle. Please try again."));
    } finally {
      setIsReturning(false);
    }
  };

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
              <img
                src={rental.signature}
                alt={t("rentals.details.signatureAlt", "Rental signature")}
                className="max-h-64 rounded-lg border bg-white p-2"
              />
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex flex-wrap justify-end gap-2">
        <Button variant="outline" onClick={() => router.push(`/bicycles/rentals/${rental.id}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          {t("common.edit", "Edit")}
        </Button>
        {canReturnBike && (
          <>
            <Button onClick={() => setIsReturnDialogOpen(true)} disabled={isReturning}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              {isReturning
                ? t("rentals.details.returningBike", "Returning bike...")
                : t("rentals.details.returnBike", "Return bike")}
            </Button>

            <Dialog
              open={isReturnDialogOpen}
              onOpenChange={(open) => {
                setIsReturnDialogOpen(open);
                if (!open) {
                  setIsBicycleChecked(false);
                  setIsDepositReturned(false);
                }
              }}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("rentals.details.returnChecklistTitle", "Return checklist")}</DialogTitle>
                  <DialogDescription>
                    {t(
                      "rentals.details.returnChecklistDescription",
                      "Complete both checks before marking this bicycle as returned.",
                    )}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <label className="flex items-start gap-3 rounded-md border p-3">
                    <Checkbox
                      checked={isBicycleChecked}
                      onCheckedChange={(checked) => setIsBicycleChecked(checked === true)}
                    />
                    <div>
                      <div className="font-medium">
                        {t("rentals.details.checkBicycleOk", "Check if bicycle is ok")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t(
                          "rentals.details.checkBicycleOkHint",
                          "Confirm the bicycle came back in acceptable condition.",
                        )}
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 rounded-md border p-3">
                    <Checkbox
                      checked={isDepositReturned}
                      onCheckedChange={(checked) => setIsDepositReturned(checked === true)}
                    />
                    <div>
                      <div className="font-medium">
                        {t("rentals.details.returnDeposit", "Return deposit")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t(
                          "rentals.details.returnDepositHint",
                          "Confirm the deposit has been given back to the renter.",
                        )}
                      </div>
                    </div>
                  </label>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsReturnDialogOpen(false)}>
                    {t("common.cancel", "Cancel")}
                  </Button>
                  <Button
                    onClick={handleReturnBike}
                    disabled={isReturning || !isReturnChecklistComplete}
                  >
                    {isReturning
                      ? t("rentals.details.returningBike", "Returning bike...")
                      : t("rentals.details.confirmReturnBike", "Confirm return")}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
}

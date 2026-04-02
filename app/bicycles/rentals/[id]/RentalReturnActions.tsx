"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useI18n } from "@/app/components/I18nProvider";

interface RentalReturnActionsProps {
  rentalId: string;
}

export function RentalReturnActions({ rentalId }: RentalReturnActionsProps) {
  const { t } = useI18n();
  const router = useRouter();
  const [isReturning, setIsReturning] = useState(false);
  const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false);
  const [isBicycleChecked, setIsBicycleChecked] = useState(false);
  const [isDepositReturned, setIsDepositReturned] = useState(false);
  const isReturnChecklistComplete = isBicycleChecked && isDepositReturned;

  const handleReturnBike = async () => {
    setIsReturning(true);

    try {
      const response = await fetch(`/api/bicycles/rentals/${rentalId}`, {
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
  );
}

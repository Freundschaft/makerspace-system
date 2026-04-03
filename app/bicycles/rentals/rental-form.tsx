"use client";

import { memo, useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/app/components/I18nProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import SignatureCanvas from "react-signature-canvas";
import type { BicycleRental, RentalStatus } from "@/generated/prisma";
import Image from "next/image";

interface RentalFormProps {
  initialData?: BicycleRental;
  mode: "create" | "edit";
}

type RentalFormState = {
  renterName: string;
  renterPhone: string;
  renterEmail: string;
  bicycleId: string;
  startDate: Date;
  endDate: Date;
  status: RentalStatus;
  actualReturnDate: Date | null;
  notes: string;
  signature: string | null;
};

function getInitialState(initialData?: BicycleRental): RentalFormState {
  if (!initialData) {
    return {
      renterName: "",
      renterPhone: "",
      renterEmail: "",
      bicycleId: "",
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      status: "ACTIVE",
      actualReturnDate: null,
      notes: "",
      signature: null,
    };
  }

  return {
    renterName: initialData.renterName,
    renterPhone: initialData.renterPhone,
    renterEmail: initialData.renterEmail ?? "",
    bicycleId: initialData.bicycleId,
    startDate: new Date(initialData.startDate),
    endDate: new Date(initialData.endDate),
    status: initialData.status,
    actualReturnDate: initialData.actualReturnDate ? new Date(initialData.actualReturnDate) : null,
    notes: initialData.notes ?? "",
    signature: initialData.signature ?? null,
  };
}

const RentalSignatureSection = memo(function RentalSignatureSection({
  signatureRef,
  currentSignature,
  showCurrentSignature,
  isCreateMode,
  clearLabel,
  currentSignatureLabel,
  signatureLabel,
  signatureAlt,
  onClearSignature,
}: {
  signatureRef: React.RefObject<SignatureCanvas | null>;
  currentSignature: string | null;
  showCurrentSignature: boolean;
  isCreateMode: boolean;
  clearLabel: string;
  currentSignatureLabel: string;
  signatureLabel: string;
  signatureAlt: string;
  onClearSignature: () => void;
}) {
  return (
    <div className="space-y-2">
      <Label>
        {signatureLabel} {isCreateMode ? "*" : ""}
      </Label>
      <div className="rounded-md border p-2">
        <SignatureCanvas
          ref={signatureRef}
          canvasProps={{
            className: "h-40 w-full rounded-md border",
          }}
        />
      </div>
      {showCurrentSignature && currentSignature ? (
        <div className="rounded-md border bg-muted/20 p-3">
          <p className="mb-2 text-sm font-medium">{currentSignatureLabel}</p>
          <Image
            src={currentSignature}
            alt={signatureAlt}
            width={640}
            height={240}
            unoptimized
            className="max-h-40 h-auto rounded-md border bg-white p-2"
          />
        </div>
      ) : null}
      <Button type="button" variant="outline" onClick={onClearSignature} className="mt-2">
        {clearLabel}
      </Button>
    </div>
  );
});

export function RentalForm({ initialData, mode }: RentalFormProps) {
  const router = useRouter();
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const signatureRef = useRef<SignatureCanvas>(null);
  const [formData, setFormData] = useState<RentalFormState>(() => getInitialState(initialData));
  const [signatureCleared, setSignatureCleared] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (
    name: "startDate" | "endDate" | "actualReturnDate",
    date: Date | undefined,
  ) => {
    if (date) {
      setFormData((prev) => ({ ...prev, [name]: date }));
    } else if (name === "actualReturnDate") {
      setFormData((prev) => ({ ...prev, actualReturnDate: null }));
    }
  };

  const handleClearSignature = useCallback(() => {
    signatureRef.current?.clear();
    setSignatureCleared(true);
    setFormData((prev) => ({ ...prev, signature: null }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (mode === "edit" && !initialData?.id) {
        throw new Error(t("rentals.edit.errors.missingId", "Missing rental id for edit"));
      }

      const drawnSignature = signatureRef.current?.isEmpty()
        ? null
        : signatureRef.current?.toDataURL() ?? null;
      const signature = signatureCleared ? null : drawnSignature ?? formData.signature;

      const endpoint = mode === "create"
        ? "/api/bicycles/rentals"
        : `/api/bicycles/rentals/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          actualReturnDate: formData.actualReturnDate,
          signature,
        }),
      });

      if (!response.ok) {
        throw new Error(
          mode === "create"
            ? t("rentals.new.errors.createFailed", "Failed to create rental")
            : t("rentals.edit.errors.updateFailed", "Failed to update rental"),
        );
      }

      if (mode === "create") {
        router.push("/bicycles/rentals");
      } else {
        router.push(`/bicycles/rentals/${initialData?.id}`);
      }
      router.refresh();
    } catch (error) {
      console.error("Error saving rental:", error);
      alert(
        mode === "create"
          ? t("rentals.new.errors.tryAgain", "Failed to create rental. Please try again.")
          : t("rentals.edit.errors.tryAgain", "Failed to update rental. Please try again."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-10">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>
            {mode === "create"
              ? t("rentals.new.title", "New Bicycle Rental")
              : t("rentals.edit.title", "Edit Bicycle Rental")}
          </CardTitle>
          <CardDescription>
            {mode === "create"
              ? t("rentals.new.description", "Create a new bicycle rental record")
              : t("rentals.edit.description", "Update an existing bicycle rental record")}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pb-28">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="renterName">{t("rentals.new.fields.renterName", "Renter Name")} *</Label>
                <Input id="renterName" name="renterName" value={formData.renterName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="renterPhone">{t("rentals.new.fields.renterPhone", "Phone Number")} *</Label>
                <Input id="renterPhone" name="renterPhone" value={formData.renterPhone} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="renterEmail">{t("rentals.new.fields.renterEmail", "Email (Optional)")}</Label>
              <Input
                id="renterEmail"
                name="renterEmail"
                type="email"
                value={formData.renterEmail}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bicycleId">{t("rentals.new.fields.bicycleId", "Bicycle ID")} *</Label>
              <Input id="bicycleId" name="bicycleId" value={formData.bicycleId} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>{t("rentals.new.fields.startDate", "Start Date")} *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? format(formData.startDate, "PPP") : <span>{t("common.pickDate", "Pick a date")}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date: Date | undefined) => handleDateChange("startDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>{t("rentals.new.fields.endDate", "End Date")} *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.endDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate ? format(formData.endDate, "PPP") : <span>{t("common.pickDate", "Pick a date")}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date: Date | undefined) => handleDateChange("endDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">{t("rentals.new.fields.notes", "Notes (Optional)")}</Label>
              <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={3} />
            </div>

            {mode === "edit" && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="status">{t("common.status", "Status")}</Label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-md border bg-background px-3 py-2"
                  >
                    <option value="ACTIVE">{t("rentals.statuses.ACTIVE", "ACTIVE")}</option>
                    <option value="RETURNED">{t("rentals.statuses.RETURNED", "RETURNED")}</option>
                    <option value="OVERDUE">{t("rentals.statuses.OVERDUE", "OVERDUE")}</option>
                    <option value="CANCELLED">{t("rentals.statuses.CANCELLED", "CANCELLED")}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>{t("rentals.details.actualReturnDate", "Actual Return Date")}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.actualReturnDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.actualReturnDate
                          ? format(formData.actualReturnDate, "PPP")
                          : <span>{t("rentals.details.notReturned", "Not returned yet")}</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.actualReturnDate ?? undefined}
                        onSelect={(date: Date | undefined) => handleDateChange("actualReturnDate", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>{t("rentals.new.agreement.title", "Rental Agreement")}</Label>
              <div className="rounded-md border bg-muted/30 p-4 text-sm">
                <p className="mb-2 font-medium">{t("rentals.new.agreement.intro", "By signing below, I agree to the following terms:")}</p>
                <ol className="list-decimal space-y-1 pl-5">
                  <li>{t("rentals.new.agreement.terms.1", "I will return the bicycle in the same condition as received, normal wear and tear excepted.")}</li>
                  <li>{t("rentals.new.agreement.terms.2", "I am responsible for any damage or loss during the rental period.")}</li>
                  <li>{t("rentals.new.agreement.terms.3", "I will return the bicycle by the agreed return date or contact the rental office for an extension.")}</li>
                  <li>{t("rentals.new.agreement.terms.4", "I understand that late returns may result in additional charges.")}</li>
                  <li>{t("rentals.new.agreement.terms.5", "I will use the bicycle safely and in accordance with local traffic laws.")}</li>
                  <li>{t("rentals.new.agreement.terms.6", "I confirm that all information provided in this rental form is accurate.")}</li>
                </ol>
              </div>
            </div>

            <RentalSignatureSection
              signatureRef={signatureRef}
              currentSignature={formData.signature}
              showCurrentSignature={!signatureCleared}
              isCreateMode={mode === "create"}
              clearLabel={t("rentals.new.actions.clearSignature", "Clear Signature")}
              currentSignatureLabel={t("rentals.edit.currentSignature", "Current signature")}
              signatureLabel={t("rentals.new.fields.signature", "Signature")}
              signatureAlt={t("rentals.details.signatureAlt", "Rental signature")}
              onClearSignature={handleClearSignature}
            />
          </CardContent>
          <CardFooter className="sticky bottom-0 z-20 flex justify-between border-t bg-background/95 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              {t("common.cancel", "Cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? mode === "create"
                  ? t("common.creating", "Creating...")
                  : t("common.saving", "Saving...")
                : mode === "create"
                  ? t("rentals.new.actions.createRental", "Create Rental")
                  : t("common.update", "Update")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

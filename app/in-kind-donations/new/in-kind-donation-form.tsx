"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useI18n } from "@/app/components/I18nProvider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const directions = ["INCOMING", "OUTGOING"] as const;
const statuses = ["PLANNED", "RECEIVED", "DISTRIBUTED", "CANCELLED"] as const;

const formSchema = z.object({
  direction: z.enum(directions),
  status: z.enum(statuses),
  date: z.string().min(1),
  item: z.string().min(1),
  quantity: z.string().optional(),
  unit: z.string().optional(),
  contactName: z.string().optional(),
  location: z.string().optional(),
  estimatedValue: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface InKindDonationFormProps {
  mode: "create" | "edit";
  donationId?: string;
  initialData?: {
    direction: (typeof directions)[number];
    status: (typeof statuses)[number];
    date: Date;
    item: string;
    quantity?: number | null;
    unit?: string | null;
    contactName?: string | null;
    location?: string | null;
    estimatedValue?: number | null;
    notes?: string | null;
  };
}

function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function InKindDonationForm({ mode, donationId, initialData }: InKindDonationFormProps) {
  const router = useRouter();
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const submitLockRef = useRef(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      direction: initialData?.direction || "INCOMING",
      status: initialData?.status || "PLANNED",
      date: initialData?.date ? toDateInputValue(initialData.date) : toDateInputValue(new Date()),
      item: initialData?.item || "",
      quantity: initialData?.quantity?.toString() || "",
      unit: initialData?.unit || "",
      contactName: initialData?.contactName || "",
      location: initialData?.location || "",
      estimatedValue: initialData?.estimatedValue?.toString() || "",
      notes: initialData?.notes || "",
    },
  });

  async function onSubmit(values: FormValues) {
    if (submitLockRef.current) {
      return;
    }
    submitLockRef.current = true;

    try {
      setIsSubmitting(true);
      const endpoint =
        mode === "create" ? "/api/in-kind-donations" : `/api/in-kind-donations/${donationId}`;
      const method = mode === "create" ? "POST" : "PUT";
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(
          mode === "create"
            ? t("inKindDonations.new.errors.createFailed", "Failed to create in-kind donation")
            : t("inKindDonations.edit.errors.updateFailed", "Failed to update in-kind donation")
        );
      }

      router.push(mode === "create" ? "/in-kind-donations" : `/in-kind-donations/${donationId}`);
      router.refresh();
    } catch (error) {
      console.error("Error saving in-kind donation:", error);
    } finally {
      submitLockRef.current = false;
      setIsSubmitting(false);
    }
  }

  async function onDelete() {
    if (!donationId) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/in-kind-donations/${donationId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(t("inKindDonations.edit.errors.deleteFailed", "Failed to delete in-kind donation"));
      }

      router.push("/in-kind-donations");
      router.refresh();
    } catch (error) {
      console.error("Error deleting in-kind donation:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="direction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("inKindDonations.fields.direction", "Direction")}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("inKindDonations.placeholders.direction", "Select direction")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="INCOMING">
                      {t("inKindDonations.directions.INCOMING", "Incoming")}
                    </SelectItem>
                    <SelectItem value="OUTGOING">
                      {t("inKindDonations.directions.OUTGOING", "Outgoing")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("common.status", "Status")}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("common.selectStatus", "Select a status")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {t(`inKindDonations.statuses.${status}`, status)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("inKindDonations.fields.date", "Date")}</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="item"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inKindDonations.fields.item", "Item")}</FormLabel>
              <FormControl>
                <Input placeholder={t("inKindDonations.placeholders.item", "Blankets, tools, laptops...")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("inKindDonations.fields.quantity", "Quantity")}</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" placeholder="10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("inKindDonations.fields.unit", "Unit")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("inKindDonations.placeholders.unit", "pcs, boxes, kg")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estimatedValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("inKindDonations.fields.estimatedValue", "Estimated Value")}</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormDescription>
                  {t("inKindDonations.help.estimatedValue", "Optional EUR estimate for reporting")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("inKindDonations.fields.contactName", "Donor / Recipient")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("inKindDonations.placeholders.contactName", "Person, team, or organization")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("inKindDonations.fields.location", "Location")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("inKindDonations.placeholders.location", "Storage, camp, partner site")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("common.notes", "Notes")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("inKindDonations.placeholders.notes", "Condition, purpose, transport notes, or handover details")}
                  className="min-h-[160px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between gap-2">
          <div>
            {mode === "edit" && donationId ? (
              <Button type="button" variant="destructive" onClick={onDelete} disabled={isDeleting}>
                {isDeleting ? t("common.deleting", "Deleting...") : t("common.delete", "Delete")}
              </Button>
            ) : null}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? t("common.saving", "Saving...")
              : mode === "create"
                ? t("inKindDonations.actions.create", "Create Donation")
                : t("common.update", "Update")}
          </Button>
        </div>
      </form>
    </Form>
  );
}

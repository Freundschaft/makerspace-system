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

const jobStatuses = ["OPEN", "CLOSED"] as const;

const formSchema = z.object({
  name: z.string().min(1),
  notes: z.string().optional(),
  status: z.enum(jobStatuses),
  slug: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface JobFormProps {
  mode: "create" | "edit";
  jobId?: string;
  initialData?: {
    name: string;
    notes?: string | null;
    status: (typeof jobStatuses)[number];
    slug?: string | null;
  };
}

export function JobForm({ mode, jobId, initialData }: JobFormProps) {
  const router = useRouter();
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const submitLockRef = useRef(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      notes: initialData?.notes || "",
      status: initialData?.status || "OPEN",
      slug: initialData?.slug || "",
    },
  });

  async function onSubmit(values: FormValues) {
    if (submitLockRef.current) {
      return;
    }
    submitLockRef.current = true;

    try {
      setIsSubmitting(true);
      const endpoint = mode === "create" ? "/api/jobs" : `/api/jobs/${jobId}`;
      const method = mode === "create" ? "POST" : "PUT";
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(
          mode === "create"
            ? t("jobs.new.errors.createFailed", "Failed to create job")
            : t("jobs.edit.errors.updateFailed", "Failed to update job")
        );
      }

      router.push(mode === "create" ? "/jobs" : `/jobs/${jobId}`);
      router.refresh();
    } catch (error) {
      console.error("Error saving job:", error);
    } finally {
      submitLockRef.current = false;
      setIsSubmitting(false);
    }
  }

  async function onDelete() {
    if (!jobId) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(t("jobs.edit.errors.deleteFailed", "Failed to delete job"));
      }

      router.push("/jobs");
      router.refresh();
    } catch (error) {
      console.error("Error deleting job:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("jobs.fields.name", "Name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("jobs.placeholders.name", "Job title")} {...field} />
              </FormControl>
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
                    <SelectValue placeholder={t("jobs.placeholders.status", "Select status")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="OPEN">{t("jobs.statuses.OPEN", "Open")}</SelectItem>
                  <SelectItem value="CLOSED">{t("jobs.statuses.CLOSED", "Closed")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("jobs.fields.slug", "Slug")}</FormLabel>
              <FormControl>
                <Input placeholder={t("jobs.placeholders.slug", "open-position-slug")} {...field} />
              </FormControl>
              <FormDescription>
                {t("jobs.help.slug", "Optional stable identifier for external links")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("common.notes", "Notes")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("jobs.placeholders.notes", "Job description and application details")}
                  className="min-h-[180px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between gap-2">
          <div>
            {mode === "edit" && jobId ? (
              <Button type="button" variant="destructive" onClick={onDelete} disabled={isDeleting}>
                {isDeleting ? t("common.deleting", "Deleting...") : t("common.delete", "Delete")}
              </Button>
            ) : null}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? t("common.saving", "Saving...")
              : mode === "create"
                ? t("jobs.actions.create", "Create Job")
                : t("common.update", "Update")}
          </Button>
        </div>
      </form>
    </Form>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useI18n } from "@/app/components/I18nProvider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const projectStatuses = ["TODO", "IN_PROGRESS", "DONE", "OFF"] as const;

const formSchema = z
  .object({
    name: z.string().min(1),
    notes: z.string().optional(),
    assignee: z.string().optional(),
    status: z.enum(projectStatuses),
    startDate: z.date().nullable().optional(),
    endDate: z.date().nullable().optional(),
    googlePhotosAlbumLink: z.string().url().optional().or(z.literal("")),
    hashtag: z.string().optional(),
    purpose: z.string().optional(),
  })
  .refine(
    (values) =>
      !values.startDate || !values.endDate || values.endDate.getTime() >= values.startDate.getTime(),
    {
      message: "End date must be on or after start date",
      path: ["endDate"],
    }
  );

type FormValues = z.infer<typeof formSchema>;

interface ProjectFormProps {
  mode: "create" | "edit";
  projectId?: string;
  initialData?: {
    name: string;
    notes?: string | null;
    assignee?: string | null;
    status: (typeof projectStatuses)[number];
    startDate?: Date | null;
    endDate?: Date | null;
    googlePhotosAlbumLink?: string | null;
    hashtag?: string | null;
    purpose?: string | null;
  };
}

export function ProjectForm({ mode, projectId, initialData }: ProjectFormProps) {
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
      assignee: initialData?.assignee || "",
      status: initialData?.status || "TODO",
      startDate: initialData?.startDate || null,
      endDate: initialData?.endDate || null,
      googlePhotosAlbumLink: initialData?.googlePhotosAlbumLink || "",
      hashtag: initialData?.hashtag || "",
      purpose: initialData?.purpose || "",
    },
  });

  async function onSubmit(values: FormValues) {
    if (submitLockRef.current) {
      return;
    }
    submitLockRef.current = true;

    try {
      setIsSubmitting(true);
      const endpoint = mode === "create" ? "/api/projects" : `/api/projects/${projectId}`;
      const method = mode === "create" ? "POST" : "PUT";
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(
          mode === "create"
            ? t("projects.new.errors.createFailed", "Failed to create project")
            : t("projects.edit.errors.updateFailed", "Failed to update project")
        );
      }

      router.push(mode === "create" ? "/projects" : `/projects/${projectId}`);
      router.refresh();
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      submitLockRef.current = false;
      setIsSubmitting(false);
    }
  }

  async function onDelete() {
    if (!projectId) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(t("projects.edit.errors.deleteFailed", "Failed to delete project"));
      }

      router.push("/projects");
      router.refresh();
    } catch (error) {
      console.error("Error deleting project:", error);
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
              <FormLabel>{t("projects.fields.name", "Name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("projects.placeholders.name", "Project name")} {...field} />
              </FormControl>
              <FormDescription>
                {t("projects.help.name", "Short title used in listings and reports")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("common.status", "Status")}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("projects.placeholders.status", "Select status")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="TODO">{t("projects.statuses.TODO", "Todo")}</SelectItem>
                    <SelectItem value="IN_PROGRESS">
                      {t("projects.statuses.IN_PROGRESS", "In Progress")}
                    </SelectItem>
                    <SelectItem value="DONE">{t("projects.statuses.DONE", "Done")}</SelectItem>
                    <SelectItem value="OFF">{t("projects.statuses.OFF", "Off")}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="assignee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("projects.fields.assignee", "Assignee")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("projects.placeholders.assignee", "Responsible person")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t("projects.fields.startDate", "Start Date")}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>{t("common.pickDate", "Pick a date")}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ?? undefined}
                      onSelect={(date) => field.onChange(date ?? null)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t("projects.fields.endDate", "End Date")}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>{t("common.pickDate", "Pick a date")}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ?? undefined}
                      onSelect={(date) => field.onChange(date ?? null)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("projects.fields.purpose", "Purpose")}</FormLabel>
              <FormControl>
                <Input placeholder={t("projects.placeholders.purpose", "Why or for whom this project exists")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hashtag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("projects.fields.hashtag", "Hashtag")}</FormLabel>
              <FormControl>
                <Input placeholder={t("projects.placeholders.hashtag", "#makerspace")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="googlePhotosAlbumLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("projects.fields.googlePhotosAlbumLink", "Google Photos Album Link")}</FormLabel>
              <FormControl>
                <Input placeholder="https://photos.app.goo.gl/..." {...field} />
              </FormControl>
              <FormDescription>
                {t("projects.help.googlePhotosAlbumLink", "Optional album link for project photos")}
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
                  placeholder={t("projects.placeholders.notes", "Project summary, outcomes, and context")}
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
            {mode === "edit" && projectId ? (
              <Button type="button" variant="destructive" onClick={onDelete} disabled={isDeleting}>
                {isDeleting ? t("common.deleting", "Deleting...") : t("common.delete", "Delete")}
              </Button>
            ) : null}
          </div>

          <div className="flex gap-2">
            {mode === "edit" && form.watch("googlePhotosAlbumLink") ? (
              <Button variant="outline" asChild>
                <Link href={form.watch("googlePhotosAlbumLink") as string} target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t("projects.actions.openAlbum", "Open album")}
                </Link>
              </Button>
            ) : null}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? t("common.saving", "Saving...")
                : mode === "create"
                  ? t("projects.actions.create", "Create Project")
                  : t("common.update", "Update")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

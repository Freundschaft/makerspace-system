"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useI18n } from "@/app/components/I18nProvider";

const formSchema = z.object({
  date: z.date(),
  houseName: z.string().min(1),
  location: z.string().optional(),
  workType: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(["OPEN", "IN_PROGRESS", "COMPLETED", "CANCELLED"]),
  timeNeeded: z.string().optional(),
  materialCosts: z.string().optional(),
  notes: z.string().optional(),
  photoPath: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function HouseProjectForm() {
  const router = useRouter();
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      houseName: "",
      location: "",
      workType: "",
      description: "",
      status: "OPEN",
      timeNeeded: "",
      materialCosts: "",
      notes: "",
      photoPath: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/house-projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(t("houseProjects.new.errors.createFailed", "Failed to create house project"));
      }

      router.push("/house-projects");
      router.refresh();
    } catch (error) {
      console.error("Error creating house project:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t("houseProjects.fields.date", "Date")}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? format(field.value, "PPP") : <span>{t("common.pickDate", "Pick a date")}</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                </PopoverContent>
              </Popover>
              <FormDescription>{t("houseProjects.help.date", "Date the work was done or logged")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="houseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("houseProjects.fields.houseName", "House Name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("houseProjects.placeholders.houseName", "House 3")} {...field} />
              </FormControl>
              <FormDescription>{t("houseProjects.help.houseName", "Which house this work belongs to")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("houseProjects.fields.location", "Location / Room")}</FormLabel>
              <FormControl>
                <Input placeholder={t("houseProjects.placeholders.location", "Kitchen, Bedroom 2, Roof")} {...field} />
              </FormControl>
              <FormDescription>{t("houseProjects.help.location", "Optional room or area in the house")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="workType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("houseProjects.fields.workType", "Work Type")}</FormLabel>
              <FormControl>
                <Input placeholder={t("houseProjects.placeholders.workType", "Fix lights, repair cabinet, add shelves")} {...field} />
              </FormControl>
              <FormDescription>{t("houseProjects.help.workType", "Short summary of the maintenance work")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("common.description", "Description")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("houseProjects.placeholders.description", "Describe what needed to be done and what was repaired or installed...")}
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>{t("houseProjects.help.description", "Detailed notes about the work")}</FormDescription>
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
                    <SelectValue placeholder={t("houseProjects.placeholders.status", "Select status")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="OPEN">{t("houseProjects.statuses.OPEN", "Open")}</SelectItem>
                  <SelectItem value="IN_PROGRESS">{t("houseProjects.statuses.IN_PROGRESS", "In Progress")}</SelectItem>
                  <SelectItem value="COMPLETED">{t("houseProjects.statuses.COMPLETED", "Completed")}</SelectItem>
                  <SelectItem value="CANCELLED">{t("houseProjects.statuses.CANCELLED", "Cancelled")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="timeNeeded"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("houseProjects.fields.timeNeeded", "Time Needed (hours)")}</FormLabel>
                <FormControl>
                  <Input type="number" placeholder={t("houseProjects.placeholders.timeNeeded", "3")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="materialCosts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("houseProjects.fields.materialCosts", "Material Costs (€)")}</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder={t("houseProjects.placeholders.materialCosts", "25.50")} {...field} />
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
                <Textarea placeholder={t("houseProjects.placeholders.notes", "Extra context, follow-ups, or materials used")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photoPath"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("common.photo", "Photo URL")}</FormLabel>
              <FormControl>
                <Input placeholder={t("houseProjects.placeholders.photoPath", "Optional photo URL")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/house-projects")}>
            {t("common.cancel", "Cancel")}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? t("common.creating", "Creating...")
              : t("houseProjects.actions.create", "Create House Project")}
          </Button>
        </div>
      </form>
    </Form>
  );
}

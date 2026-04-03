"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useMemo, useRef, useState } from "react"
import { MultiSelectButtons } from "@/components/ui/multi-select-buttons"
import { FileUpload } from "@/components/ui/file-upload"
import { Checkbox } from "@/components/ui/checkbox"
import { useI18n } from "@/app/components/I18nProvider"
import { IdScanButton } from "@/components/IdScanButton"
import {
  electronicsCategories,
  electronicsCategoryLabels,
  getElectronicsCategoryImage,
} from "@/lib/electronics-categories"

const formSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  customerIdCardNumber: z.string().min(1, "ID card number is required"),
  category: z.enum(electronicsCategories),
  item: z.string().optional(),
  whatsapp: z.string().optional(),
  serialNumber: z.string().optional(),
  status: z.enum([
    "UNCHECKED", "CHECKED", "IN_PROGRESS", "READY_FOR_PICKUP",
    "DONE", "PICKED_UP", "NO_WAY_TO_FIX"
  ]),
  repairable: z.boolean().optional(),
  notes: z.string().optional(),
  photoPath: z.string().optional(),
})

const statusOptions = [
  "UNCHECKED",
  "CHECKED",
  "IN_PROGRESS",
  "READY_FOR_PICKUP",
  "DONE",
  "PICKED_UP",
  "NO_WAY_TO_FIX",
] as const

const defaultValues: Omit<z.infer<typeof formSchema>, "category"> = {
  customerName: "",
  customerIdCardNumber: "",
  item: "",
  whatsapp: "",
  serialNumber: "",
  status: "UNCHECKED",
  repairable: undefined,
  notes: "",
  photoPath: "",
}

export function ElectronicsRepairForm() {
  const router = useRouter()
  const { t } = useI18n()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submitLockRef = useRef(false)
  const localizedCategoryOptions = useMemo(
    () => electronicsCategories.map((value) => ({
      value,
      label: t(
        `electronics.categories.${value}`,
        electronicsCategoryLabels[value]
      ),
      image: getElectronicsCategoryImage(value),
    })),
    [t]
  )
  const localizedStatusOptions = useMemo(
    () =>
      statusOptions.map((value) => ({
        value,
        label: t(`common.statuses.${value}`, value),
      })),
    [t]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (submitLockRef.current) {
      return
    }
    submitLockRef.current = true
    try {
      setIsSubmitting(true)
      const response = await fetch("/api/electronics/repairs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          createdDate: new Date(),
        }),
      })

      if (!response.ok) {
        throw new Error(t("electronics.new.errors.createFailed", "Failed to create electronics repair"))
      }

      router.push("/electronics/repairs")
      router.refresh()
    } catch (error) {
      console.error("Error creating electronics repair:", error)
    } finally {
      submitLockRef.current = false
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-28 sm:space-y-8">
        <IdScanButton
          label={t("common.scanId", "Scan ID")}
          scanningLabel={t("common.scanningId", "Scanning ID...")}
          helpText={t(
            "common.scanIdHelp",
            "Use the tablet or phone camera to read the name and ID number locally in the browser."
          )}
          errorText={t(
            "common.scanIdError",
            "Could not read the ID clearly. Please try again or enter the values manually."
          )}
          debugTitle={t("common.scanDebug", "Scan debug")}
          rawTextLabel={t("common.scanDebugRawText", "Raw OCR text")}
          confidenceLabel={t("common.scanDebugConfidence", "Confidence")}
          detectedNameLabel={t("common.scanDebugName", "Detected name")}
          detectedIdLabel={t("common.scanDebugId", "Detected ID number")}
          imagePreviewLabel={t("common.scanDebugImage", "Captured image")}
          candidateLinesLabel={t("common.scanDebugLines", "OCR lines")}
          onScanResult={({ name, idNumber }) => {
            if (name && !form.getValues("customerName")) {
              form.setValue("customerName", name, { shouldDirty: true });
            }
            if (idNumber && !form.getValues("customerIdCardNumber")) {
              form.setValue("customerIdCardNumber", idNumber, {
                shouldDirty: true,
              });
            }
          }}
        />

        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("electronics.new.fields.customerName", "Customer Name")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("electronics.new.placeholders.customerName", "Enter customer name")}
                  className="text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("electronics.new.help.customerName", "Name of the person requesting the repair")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customerIdCardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">
                {t("electronics.new.fields.customerIdCardNumber", "ID Card Number")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("electronics.new.placeholders.customerIdCardNumber", "Government ID or card number")}
                  className="text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("electronics.new.help.customerIdCardNumber", "ID card number of the person bringing the device")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm sm:text-base">{t("electronics.new.fields.category", "Category")}</FormLabel>
              <FormControl>
                <MultiSelectButtons
                  options={localizedCategoryOptions}
                  selectedValues={field.value ? [field.value] : []}
                  onChange={(values) =>
                    field.onChange(values[values.length - 1] ?? field.value)
                  }
                  className="grid-cols-2 md:grid-cols-4 xl:grid-cols-6"
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("electronics.new.help.category", "Type of electronic device")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="item"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("electronics.new.fields.item", "Item Description")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("electronics.new.placeholders.item", "e.g. Samsung Galaxy S21, HP ProBook")}
                  className="text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("electronics.new.help.item", "Brand, model, or specific description (optional)")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("electronics.new.fields.whatsapp", "WhatsApp")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("common.phonePlaceholder", "+1234567890")}
                  className="text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("electronics.new.help.whatsapp", "WhatsApp contact number (optional)")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serialNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("electronics.new.fields.serialNumber", "Serial Number")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("electronics.new.placeholders.serialNumber", "Serial or IMEI number")}
                  className="text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("electronics.new.help.serialNumber", "Device serial number or barcode (optional)")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photoPath"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("electronics.new.fields.photo", "Device Photo")}</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("electronics.new.help.photo", "Upload a photo of the device (optional)")}
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
              <FormLabel className="text-sm sm:text-base">{t("common.notes", "Notes")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("electronics.new.placeholders.notes", "Describe the problem, parts needed, etc...")}
                  className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("electronics.new.help.notes", "Additional details about the repair (optional)")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="repairable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm sm:text-base">
                  {t("electronics.new.fields.repairable", "Repairable")}
                </FormLabel>
                <FormDescription className="text-xs sm:text-sm">
                  {t("electronics.new.help.repairable", "Check if the device can be repaired")}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("common.status", "Status")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-sm sm:text-base">
                    <SelectValue placeholder={t("common.selectStatus", "Select a status")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {localizedStatusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className="text-xs sm:text-sm">
                {t("electronics.new.help.status", "Current status of the repair")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="sticky bottom-0 z-20 -mx-4 flex flex-col gap-3 border-t bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:-mx-6 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
            {t("common.cancel", "Cancel")}
          </Button>
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? t("common.creating", "Creating...") : t("electronics.new.actions.create", "Create Repair")}
          </Button>
        </div>
      </form>
    </Form>
  )
}

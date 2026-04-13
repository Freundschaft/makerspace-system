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
import { useEffect, useMemo, useRef, useState } from "react"
import { MultiSelectButtons } from "@/components/ui/multi-select-buttons"
import { FileUpload } from "@/components/ui/file-upload"
import { useI18n } from "@/app/components/I18nProvider"
import { IdScanButton } from "@/components/IdScanButton"
import { localizePathname } from "@/lib/i18n/config"

// Define the ProblemType interface
interface ProblemType {
  id: string
  value: string
  label: string
  image: string
}

interface PartOption {
  id: string
  name: string
  description: string | null
}

// Define the form props interface
interface RepairFormProps {
  problemTypes: ProblemType[]
  parts: PartOption[]
  repairId?: string
  initialData?: {
    problemTypes: string[]
    description: string | null
    repairDetails: string | null
    receivedDate: string
    ownerName: string
    ownerIdCardNumber: string | null
    ownerPhone: string | null
    status: "PENDING" | "IN_PROGRESS" | "WAITING_FOR_PARTS" | "COMPLETED" | "PICKED_UP" | "CANCELLED"
    photoPath: string | null
    selectedPartIds: string[]
  }
}

function getDefaultValues(initialData?: RepairFormProps["initialData"]) {
  return {
    problemTypes: initialData?.problemTypes ?? [],
    description: initialData?.description ?? "",
    repairDetails: initialData?.repairDetails ?? "",
    receivedDate: initialData?.receivedDate ?? new Date().toISOString().slice(0, 10),
    ownerName: initialData?.ownerName ?? "",
    ownerIdCardNumber: initialData?.ownerIdCardNumber ?? "",
    ownerPhone: initialData?.ownerPhone ?? "",
    status: initialData?.status ?? "PENDING",
    photoPath: initialData?.photoPath ?? "",
    selectedPartIds: initialData?.selectedPartIds ?? [],
  } as const;
}

// Create a dynamic schema based on the problem types
const createFormSchema = () => {
  return z.object({
    problemTypes: z.array(z.string()).min(1, "Select at least one problem type"),
    description: z.string().optional(),
    repairDetails: z.string().optional(),
    receivedDate: z.string().min(1, "Received date is required"),
    ownerName: z.string().min(1, "Owner name is required"),
    ownerIdCardNumber: z.string().optional(),
    ownerPhone: z.string().optional(),
    status: z.enum(["PENDING", "IN_PROGRESS", "WAITING_FOR_PARTS", "COMPLETED", "PICKED_UP", "CANCELLED"]),
    photoPath: z.string().optional(),
    selectedPartIds: z.array(z.string()).optional(),
  })
}

export function RepairForm({ problemTypes, parts, repairId, initialData }: RepairFormProps) {
  const router = useRouter()
  const { locale, t } = useI18n()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submitLockRef = useRef(false)
  const isEditMode = Boolean(repairId)
  
  // Create the form schema dynamically based on the provided problem types
  const formSchema = useMemo(() => createFormSchema(), [])
  const problemTypeOptions = useMemo(
    () =>
      problemTypes.map((type) => ({
        value: type.value,
        label: type.label,
        image: type.image,
      })),
    [problemTypes]
  )
  const partOptions = useMemo(
    () =>
      parts.map((part) => ({
        value: part.id,
        label: part.name,
      })),
    [parts]
  )
  const defaultValues = useMemo(() => getDefaultValues(initialData), [initialData])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  useEffect(() => {
    form.reset(defaultValues)
  }, [defaultValues, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (submitLockRef.current) {
      return
    }
    submitLockRef.current = true
    try {
      setIsSubmitting(true)
      const normalizedDescription = values.description?.trim() || null
      const normalizedRepairDetails = values.repairDetails?.trim() || null
      const response = await fetch(
        isEditMode ? `/api/bicycles/repairs/${repairId}` : "/api/bicycles/repairs",
        {
          method: isEditMode ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            description: normalizedDescription,
            repairDetails: normalizedRepairDetails,
            receivedDate: values.receivedDate,
          }),
        }
      )

      if (!response.ok) {
        throw new Error(
          isEditMode
            ? t("modules.repairs.errors.updateFailed", "Failed to update repair")
            : t("modules.repairs.errors.createFailed", "Failed to create repair")
        )
      }

      const targetHref =
        isEditMode
          ? localizePathname(`/bicycles/repairs/${repairId}`, locale)
          : localizePathname("/bicycles/repairs", locale)
      if (isEditMode) {
        router.replace(targetHref)
      } else {
        router.push(targetHref)
      }
      router.refresh()
    } catch (error) {
      console.error(isEditMode ? "Error updating repair:" : "Error creating repair:", error)
      // You might want to show an error message to the user here
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
            if (name && !form.getValues("ownerName")) {
              form.setValue("ownerName", name, { shouldDirty: true });
            }
            if (idNumber && !form.getValues("ownerIdCardNumber")) {
              form.setValue("ownerIdCardNumber", idNumber, {
                shouldDirty: true,
              });
            }
          }}
        />

        <FormField
          control={form.control}
          name="problemTypes"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm sm:text-base">{t("repairs.form.problemTypes", "Problem Types")}</FormLabel>
              <FormControl>
                <MultiSelectButtons
                  options={problemTypeOptions}
                  selectedValues={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("repairs.form.problemTypesHelp", "Select all applicable problem types")}
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
              <FormLabel className="text-sm sm:text-base">{t("repairs.form.bicyclePhoto", "Bicycle Photo")}</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("repairs.form.bicyclePhotoHelp", "Upload a photo of the bicycle (optional)")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="receivedDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">
                {t("repairs.details.receivedDate", "Received Date")}
              </FormLabel>
              <FormControl>
                <Input type="date" className="text-sm sm:text-base" {...field} />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t(
                  "repairs.form.receivedDateHelp",
                  "Defaults to today, but you can backdate repairs entered after the fact."
                )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("common.description", "Description")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("repairs.form.descriptionPlaceholder", "Detailed description of the problem...")}
                  className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("repairs.form.descriptionHelp", "Provide a detailed description of the problem (optional)")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="repairDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("repairs.form.repairDetails", "Repairs Done")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("repairs.form.repairDetailsPlaceholder", "Describe the work completed or planned...")}
                  className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("repairs.form.repairDetailsHelp", "Track what repairs were done or still need to be done.")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="selectedPartIds"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm sm:text-base">{t("repairs.form.partsReplaced", "Parts Replaced")}</FormLabel>
              <FormControl>
                {partOptions.length ? (
                  <MultiSelectButtons
                    options={partOptions}
                    selectedValues={field.value ?? []}
                    onChange={field.onChange}
                    className="md:grid-cols-4 xl:grid-cols-4"
                  />
                ) : (
                  <div className="rounded-lg border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
                    {t("repairs.form.noPartsAvailable", "No repair parts are available to select yet.")}
                  </div>
                )}
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("repairs.form.partsReplacedHelp", "Select the parts that were replaced during this repair.")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ownerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">
                {t("repairs.form.ownerName", "Owner Name")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("repairs.form.ownerNamePlaceholder", "Full name of the person who brought the bicycle")}
                  className="text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("repairs.form.ownerNameHelp", "Record who brought the bicycle in.")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ownerIdCardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">
                {t("repairs.form.ownerIdCardNumber", "ID Card Number")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("repairs.form.ownerIdCardNumberPlaceholder", "Government ID or card number")}
                  className="text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("repairs.form.ownerIdCardNumberHelp", "Record the ID card number of the person who brought the bicycle, if available.")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ownerPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("repairs.form.ownerPhone", "Owner Phone")}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={t("common.phonePlaceholder", "+1234567890")} 
                  className="text-sm sm:text-base"
                  {...field} 
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("repairs.form.ownerPhoneHelp", "Contact number of the bicycle owner, if available.")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("common.status", "Status")}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="text-sm sm:text-base">
                    <SelectValue placeholder={t("common.selectStatus", "Select a status")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PENDING">{t("common.statuses.pending", "Pending")}</SelectItem>
                  <SelectItem value="IN_PROGRESS">{t("common.statuses.inProgress", "In Progress")}</SelectItem>
                  <SelectItem value="WAITING_FOR_PARTS">{t("common.statuses.waitingForParts", "Waiting for Parts")}</SelectItem>
                  <SelectItem value="COMPLETED">{t("common.statuses.completed", "Completed")}</SelectItem>
                  <SelectItem value="PICKED_UP">{t("common.statuses.pickedUp", "Picked Up")}</SelectItem>
                  <SelectItem value="CANCELLED">{t("common.statuses.cancelled", "Cancelled")}</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-xs sm:text-sm">
                {t("repairs.form.statusHelp", "Current status of the repair")}
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
            {isSubmitting
              ? (isEditMode ? t("common.saving", "Saving...") : t("common.creating", "Creating..."))
              : (isEditMode ? t("common.saveChanges", "Save Changes") : t("repairs.form.createRepair", "Create Repair"))}
          </Button>
        </div>
      </form>
    </Form>
  )
} 

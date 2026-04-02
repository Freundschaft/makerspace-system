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
import { useMemo, useState } from "react"
import { MultiSelectButtons } from "@/components/ui/multi-select-buttons"
import { FileUpload } from "@/components/ui/file-upload"
import { useI18n } from "@/app/components/I18nProvider"
import { IdScanButton } from "@/components/IdScanButton"

// Define the ProblemType interface
interface ProblemType {
  id: string
  value: string
  label: string
  image: string
}

// Define the form props interface
interface RepairFormProps {
  problemTypes: ProblemType[]
}

// Create a dynamic schema based on the problem types
const createFormSchema = (problemTypes: ProblemType[]) => {
  return z.object({
    problemTypes: z.array(z.string()).min(1, "Select at least one problem type"),
    description: z.string().min(1, "Description is required"),
    ownerName: z.string().min(1, "Owner name is required"),
    ownerIdCardNumber: z.string().min(1, "ID card number is required"),
    ownerPhone: z.string().min(1, "Owner phone is required"),
    status: z.enum(["PENDING", "IN_PROGRESS", "WAITING_FOR_PARTS", "COMPLETED", "PICKED_UP", "CANCELLED"]),
    photoPath: z.string().optional(),
  })
}

export function RepairForm({ problemTypes }: RepairFormProps) {
  const router = useRouter()
  const { t } = useI18n()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Create the form schema dynamically based on the provided problem types
  const formSchema = useMemo(() => createFormSchema(problemTypes), [problemTypes])
  const problemTypeOptions = useMemo(
    () =>
      problemTypes.map((type) => ({
        value: type.value,
        label: type.label,
        image: type.image,
      })),
    [problemTypes]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problemTypes: [],
      description: "",
      ownerName: "",
      ownerIdCardNumber: "",
      ownerPhone: "",
      status: "PENDING",
      photoPath: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      const response = await fetch("/api/bicycles/repairs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          receivedDate: new Date(),
        }),
      })

      if (!response.ok) {
        throw new Error(t("modules.repairs.errors.createFailed", "Failed to create repair"))
      }

      router.push("/bicycles/repairs")
      router.refresh()
    } catch (error) {
      console.error("Error creating repair:", error)
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-8">
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
                {t("repairs.form.descriptionHelp", "Provide a detailed description of the problem")}
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
                {t("repairs.form.ownerIdCardNumberHelp", "Record the ID card number of the person who brought the bicycle.")}
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
                {t("repairs.form.ownerPhoneHelp", "Contact number of the bicycle owner")}
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? t("common.creating", "Creating...") : t("repairs.form.createRepair", "Create Repair")}
        </Button>
      </form>
    </Form>
  )
} 

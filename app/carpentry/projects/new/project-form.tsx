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
import { FileUpload } from "@/components/ui/file-upload"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useI18n } from "@/app/components/I18nProvider"

const formSchema = z.object({
  date: z.date(),
  acceptedBy: z.string().optional(),
  customerType: z.enum([
    "PRIVATE_PERSON", "ORGANIZATION", "BARBERSHOP", "HOUSE"
  ]).optional(),
  organizationName: z.string().optional(),
  customerName: z.string().optional(),
  phoneNumber: z.string().optional(),
  gender: z.enum(["FEMALE", "MALE"]).optional(),
  orderType: z.enum(["REPAIR_ORDER", "PROJECT"]).optional(),
  timeNeeded: z.string().optional(),
  itemToRepair: z.string().optional(),
  problemDescription: z.string().optional(),
  projectDescription: z.string().optional(),
  materialCosts: z.string().optional(),
  paidByCustomer: z.boolean().optional(),
  photoPath: z.string().optional(),
})

const customerTypeOptions = [
  "PRIVATE_PERSON",
  "ORGANIZATION",
  "BARBERSHOP",
  "HOUSE",
] as const

const genderOptions = ["FEMALE", "MALE"] as const

const orderTypeOptions = ["REPAIR_ORDER", "PROJECT"] as const

const defaultValues: z.infer<typeof formSchema> = {
  date: new Date(),
  acceptedBy: "",
  customerType: undefined,
  organizationName: "",
  customerName: "",
  phoneNumber: "",
  gender: undefined,
  orderType: undefined,
  timeNeeded: "",
  itemToRepair: "",
  problemDescription: "",
  projectDescription: "",
  materialCosts: "",
  paidByCustomer: false,
  photoPath: "",
}

export function CarpentryProjectForm() {
  const router = useRouter()
  const { t } = useI18n()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const localizedCustomerTypeOptions = useMemo(
    () =>
      customerTypeOptions.map((value) => ({
        value,
        label: t(`carpentry.customerTypes.${value}`, value),
      })),
    [t]
  )
  const localizedGenderOptions = useMemo(
    () =>
      genderOptions.map((value) => ({
        value,
        label: t(`carpentry.genders.${value}`, value),
      })),
    [t]
  )
  const localizedOrderTypeOptions = useMemo(
    () =>
      orderTypeOptions.map((value) => ({
        value,
        label: t(`carpentry.orderTypes.${value}`, value),
      })),
    [t]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      const response = await fetch("/api/carpentry/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error(t("carpentry.new.errors.createFailed", "Failed to create carpentry project"))
      }

      router.push("/carpentry/projects")
      router.refresh()
    } catch (error) {
      console.error("Error creating carpentry project:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-28 sm:space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm sm:text-base">{t("carpentry.new.fields.date", "Date")}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
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
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription className="text-xs sm:text-sm">
                {t("carpentry.new.help.date", "Date the order was received")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acceptedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("carpentry.new.fields.acceptedBy", "Accepted By")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("carpentry.new.placeholders.acceptedBy", "Team member who accepted the order")}
                  className="text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("carpentry.new.help.acceptedBy", "Name of the staff member (optional)")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customerType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("carpentry.new.fields.customerType", "Customer Type")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-sm sm:text-base">
                    <SelectValue placeholder={t("carpentry.new.placeholders.customerType", "Select customer type")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {localizedCustomerTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className="text-xs sm:text-sm">
                {t("carpentry.new.help.customerType", "Type of customer (optional)")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="organizationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("carpentry.new.fields.organizationName", "Organization Name")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("carpentry.new.placeholders.organizationName", "Name of NGO or organization")}
                  className="text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("carpentry.new.help.organizationName", "If customer is an organization (optional)")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("carpentry.new.fields.customerName", "Customer Name")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("carpentry.new.placeholders.customerName", "Customer name")}
                  className="text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("carpentry.new.help.customerName", "Individual customer name (optional)")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("carpentry.new.fields.phoneNumber", "Phone Number")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("common.phonePlaceholder", "+1234567890")}
                  className="text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("carpentry.new.help.phoneNumber", "Contact number (optional)")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("carpentry.new.fields.gender", "Gender")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-sm sm:text-base">
                    <SelectValue placeholder={t("carpentry.new.placeholders.gender", "Select gender")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {localizedGenderOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className="text-xs sm:text-sm">
                {t("carpentry.new.help.gender", "Customer gender (optional)")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="orderType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("carpentry.new.fields.orderType", "Order Type")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-sm sm:text-base">
                    <SelectValue placeholder={t("carpentry.new.placeholders.orderType", "Select order type")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {localizedOrderTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className="text-xs sm:text-sm">
                {t("carpentry.new.help.orderType", "Type of work to be done (optional)")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeNeeded"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("carpentry.new.fields.timeNeeded", "Time Needed (hours)")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t("carpentry.new.placeholders.timeNeeded", "Estimated hours")}
                  className="text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("carpentry.new.help.timeNeeded", "Estimated time in hours (optional)")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itemToRepair"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("carpentry.new.fields.itemToRepair", "Item to Repair")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("carpentry.new.placeholders.itemToRepair", "Description of item needing repair...")}
                  className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("carpentry.new.help.itemToRepair", "What needs to be repaired (optional)")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="problemDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("carpentry.new.fields.problemDescription", "Problem Description")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("carpentry.new.placeholders.problemDescription", "Describe the problem...")}
                  className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("carpentry.new.help.problemDescription", "Details about the issue (optional)")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("carpentry.new.fields.projectDescription", "Project Description")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("carpentry.new.placeholders.projectDescription", "Describe the project...")}
                  className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("carpentry.new.help.projectDescription", "Overall project details (optional)")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="materialCosts"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("carpentry.new.fields.materialCosts", "Material Costs (€)")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder={t("carpentry.new.placeholders.materialCosts", "0.00")}
                  className="text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("carpentry.new.help.materialCosts", "Cost of materials in euros (optional)")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paidByCustomer"
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
                  {t("carpentry.new.fields.paidByCustomer", "Paid by Customer")}
                </FormLabel>
                <FormDescription className="text-xs sm:text-sm">
                  {t("carpentry.new.help.paidByCustomer", "Check if materials were paid for by customer")}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photoPath"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">{t("carpentry.new.fields.photo", "Project Photo")}</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                {t("carpentry.new.help.photo", "Upload a photo of the project (optional)")}
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
            {isSubmitting ? t("common.creating", "Creating...") : t("carpentry.new.actions.create", "Create Project")}
          </Button>
        </div>
      </form>
    </Form>
  )
}

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
import { useState } from "react"
import { FileUpload } from "@/components/ui/file-upload"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  category: z.enum([
    "PHONE", "TABLET", "HEADPHONES", "HEATER", "SPEAKER", "HAIR_CLIPPER",
    "COOLER", "POWER_BANK", "KETTLE", "LAPTOP", "MULTI_SOCKET", "PIZZA_PAN_CABLE",
    "PAN", "GLASSES", "AUX", "WATCH", "ADAPTOR", "HANDSFREE", "CABLE",
    "HAIR_CUTTER", "HAIR_DRYER", "FAN", "PRINTER", "ELECTRONIC_CIGARETTE",
    "STOVE", "PIZZA_PAN", "WIRELESS", "EAR_PAD", "SMART_WATCH", "XBOX360",
    "TOASTER", "TAILOR_MACHINE", "BATTERY", "PHONE_CASE", "BRACELET", "TESBIH",
    "HAND_MIXER", "COMPUTER", "SEWING_MACHINE", "WATER_HEATER", "PUMP",
    "KEYBOARD", "PLUG", "WATER_BOILER", "THERAPY", "COFFEE_MAKER", "KITCHEN",
    "BOARD", "MAT", "RADIO", "VACUUM_CLEANER", "OTHER"
  ]),
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

const categoryOptions = [
  { value: "PHONE", label: "Phone" },
  { value: "TABLET", label: "Tablet" },
  { value: "LAPTOP", label: "Laptop" },
  { value: "COMPUTER", label: "Computer" },
  { value: "HEADPHONES", label: "Headphones" },
  { value: "SPEAKER", label: "Speaker" },
  { value: "POWER_BANK", label: "Power Bank" },
  { value: "PRINTER", label: "Printer" },
  { value: "KEYBOARD", label: "Keyboard" },
  { value: "WATCH", label: "Watch" },
  { value: "SMART_WATCH", label: "Smart Watch" },
  { value: "HEATER", label: "Heater" },
  { value: "FAN", label: "Fan" },
  { value: "COOLER", label: "Cooler" },
  { value: "HAIR_CLIPPER", label: "Hair Clipper" },
  { value: "HAIR_CUTTER", label: "Hair Cutter" },
  { value: "HAIR_DRYER", label: "Hair Dryer" },
  { value: "KETTLE", label: "Kettle" },
  { value: "WATER_BOILER", label: "Water Boiler" },
  { value: "WATER_HEATER", label: "Water Heater" },
  { value: "COFFEE_MAKER", label: "Coffee Maker" },
  { value: "TOASTER", label: "Toaster" },
  { value: "HAND_MIXER", label: "Hand Mixer" },
  { value: "SEWING_MACHINE", label: "Sewing Machine" },
  { value: "TAILOR_MACHINE", label: "Tailor Machine" },
  { value: "VACUUM_CLEANER", label: "Vacuum Cleaner" },
  { value: "RADIO", label: "Radio" },
  { value: "XBOX360", label: "Xbox 360" },
  { value: "MULTI_SOCKET", label: "Multi Socket" },
  { value: "CABLE", label: "Cable" },
  { value: "ADAPTOR", label: "Adaptor" },
  { value: "PLUG", label: "Plug" },
  { value: "BATTERY", label: "Battery" },
  { value: "OTHER", label: "Other" },
]

export function ElectronicsRepairForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      item: "",
      whatsapp: "",
      serialNumber: "",
      status: "UNCHECKED",
      repairable: undefined,
      notes: "",
      photoPath: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
        throw new Error("Failed to create electronics repair")
      }

      router.push("/electronics/repairs")
      router.refresh()
    } catch (error) {
      console.error("Error creating electronics repair:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-8">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">Customer Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter customer name"
                  className="text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                Name of the person requesting the repair
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-sm sm:text-base">
                    <SelectValue placeholder="Select device category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[300px]">
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className="text-xs sm:text-sm">
                Type of electronic device
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
              <FormLabel className="text-sm sm:text-base">Item Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Samsung Galaxy S21, HP ProBook"
                  className="text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                Brand, model, or specific description (optional)
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
              <FormLabel className="text-sm sm:text-base">WhatsApp</FormLabel>
              <FormControl>
                <Input
                  placeholder="+1234567890"
                  className="text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                WhatsApp contact number (optional)
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
              <FormLabel className="text-sm sm:text-base">Serial Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Serial or IMEI number"
                  className="text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                Device serial number or barcode (optional)
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
              <FormLabel className="text-sm sm:text-base">Device Photo</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                Upload a photo of the device (optional)
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
              <FormLabel className="text-sm sm:text-base">Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the problem, parts needed, etc..."
                  className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                Additional details about the repair (optional)
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
                  Repairable
                </FormLabel>
                <FormDescription className="text-xs sm:text-sm">
                  Check if the device can be repaired
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
              <FormLabel className="text-sm sm:text-base">Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-sm sm:text-base">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="UNCHECKED">Unchecked</SelectItem>
                  <SelectItem value="CHECKED">Checked</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="READY_FOR_PICKUP">Ready for Pickup</SelectItem>
                  <SelectItem value="DONE">Done</SelectItem>
                  <SelectItem value="PICKED_UP">Picked Up</SelectItem>
                  <SelectItem value="NO_WAY_TO_FIX">No Way to Fix</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-xs sm:text-sm">
                Current status of the repair
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "Creating..." : "Create Repair"}
        </Button>
      </form>
    </Form>
  )
}

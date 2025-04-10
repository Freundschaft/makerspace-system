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
import { MultiSelectButtons } from "@/components/ui/multi-select-buttons"
import { FileUpload } from "@/components/ui/file-upload"

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
    ownerPhone: z.string().min(1, "Owner phone is required"),
    status: z.enum(["PENDING", "IN_PROGRESS", "WAITING_FOR_PARTS", "COMPLETED", "PICKED_UP", "CANCELLED"]),
    photoPath: z.string().optional(),
  })
}

export function RepairForm({ problemTypes }: RepairFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Create the form schema dynamically based on the provided problem types
  const formSchema = createFormSchema(problemTypes)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problemTypes: [],
      description: "",
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
        throw new Error("Failed to create repair")
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
        <FormField
          control={form.control}
          name="problemTypes"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm sm:text-base">Problem Types</FormLabel>
              <FormControl>
                <MultiSelectButtons
                  options={problemTypes.map(type => ({
                    value: type.value,
                    label: type.label,
                    image: type.image
                  }))}
                  selectedValues={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                Select all applicable problem types
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
              <FormLabel className="text-sm sm:text-base">Bicycle Photo</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                Upload a photo of the bicycle (optional)
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
              <FormLabel className="text-sm sm:text-base">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detailed description of the problem..."
                  className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                Provide a detailed description of the problem
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
              <FormLabel className="text-sm sm:text-base">Owner Phone</FormLabel>
              <FormControl>
                <Input 
                  placeholder="+1234567890" 
                  className="text-sm sm:text-base"
                  {...field} 
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                Contact number of the bicycle owner
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
              <FormLabel className="text-sm sm:text-base">Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-sm sm:text-base">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="WAITING_FOR_PARTS">Waiting for Parts</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="PICKED_UP">Picked Up</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
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
"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import SignatureCanvas from "react-signature-canvas"

export default function NewBicycleRentalPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const signatureRef = useRef<SignatureCanvas>(null)
  const [formData, setFormData] = useState({
    renterName: "",
    renterPhone: "",
    renterEmail: "",
    bicycleId: "",
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)), // Default 7 days
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (name: string, date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ ...prev, [name]: date }))
    }
  }

  const handleClearSignature = () => {
    signatureRef.current?.clear()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Get signature data
      const signatureData = signatureRef.current?.toDataURL() || null

      const response = await fetch("/api/bicycles/rentals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          signature: signatureData,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create rental")
      }

      router.push("/bicycles/rentals")
      router.refresh()
    } catch (error) {
      console.error("Error creating rental:", error)
      alert("Failed to create rental. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-4 sm:py-10 px-4 sm:px-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>New Bicycle Rental</CardTitle>
          <CardDescription>Create a new bicycle rental record</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="renterName">Renter Name *</Label>
                <Input
                  id="renterName"
                  name="renterName"
                  value={formData.renterName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="renterPhone">Phone Number *</Label>
                <Input
                  id="renterPhone"
                  name="renterPhone"
                  value={formData.renterPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="renterEmail">Email (Optional)</Label>
              <Input
                id="renterEmail"
                name="renterEmail"
                type="email"
                value={formData.renterEmail}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bicycleId">Bicycle ID *</Label>
              <Input
                id="bicycleId"
                name="bicycleId"
                value={formData.bicycleId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date: Date | undefined) => handleDateChange("startDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date: Date | undefined) => handleDateChange("endDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Rental Agreement</Label>
              <div className="border rounded-md p-4 bg-muted/30 text-sm">
                <p className="mb-2 font-medium">By signing below, I agree to the following terms:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>I will return the bicycle in the same condition as received, normal wear and tear excepted.</li>
                  <li>I am responsible for any damage or loss during the rental period.</li>
                  <li>I will return the bicycle by the agreed return date or contact the rental office for an extension.</li>
                  <li>I understand that late returns may result in additional charges.</li>
                  <li>I will use the bicycle safely and in accordance with local traffic laws.</li>
                  <li>I confirm that all information provided in this rental form is accurate.</li>
                </ol>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Signature *</Label>
              <div className="border rounded-md p-2">
                <SignatureCanvas
                  ref={signatureRef}
                  canvasProps={{
                    className: "w-full h-40 border rounded-md",
                  }}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleClearSignature}
                className="mt-2"
              >
                Clear Signature
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/bicycles/rentals")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Rental"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
} 
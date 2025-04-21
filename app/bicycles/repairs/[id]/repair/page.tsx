"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"

type Part = {
  id: string
  name: string
  quantity: number
}

type Repair = {
  id: string
  problemTypes: string
  description: string
  receivedDate: Date
  repairedDate: Date | null
  pickupDate: Date | null
  ownerPhone: string
  status: 'PENDING' | 'IN_PROGRESS' | 'WAITING_FOR_PARTS' | 'COMPLETED' | 'PICKED_UP' | 'CANCELLED'
  photoPath: string | null
  partsUsed: {
    part: {
      id: string
      name: string
    }
    quantity: number
  }[]
}

export default function RepairPartsPage() {
  const params = useParams()
  const router = useRouter()
  const [repair, setRepair] = useState<Repair | null>(null)
  const [parts, setParts] = useState<Part[]>([])
  const [availableParts, setAvailableParts] = useState<Part[]>([])
  const [selectedPartId, setSelectedPartId] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(1)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch repair details
        const repairResponse = await fetch(`/api/bicycles/repairs/${params.id}`)
        if (!repairResponse.ok) {
          throw new Error('Failed to fetch repair')
        }
        const repairData = await repairResponse.json()
        setRepair(repairData)

        // Fetch all available parts
        const partsResponse = await fetch('/api/parts')
        if (!partsResponse.ok) {
          throw new Error('Failed to fetch parts')
        }
        const partsData = await partsResponse.json()
        setAvailableParts(partsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const handleAddPart = async () => {
    if (!selectedPartId || quantity <= 0) return

    setSaving(true)
    try {
      const selectedPart = availableParts.find(p => p.id === selectedPartId)
      if (!selectedPart) return

      const newPart = {
        partId: selectedPartId,
        quantity: quantity
      }

      const response = await fetch(`/api/bicycles/repairs/${params.id}/parts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPart),
      })

      if (!response.ok) {
        throw new Error('Failed to add part')
      }

      // Refresh repair data
      const repairResponse = await fetch(`/api/bicycles/repairs/${params.id}`)
      if (!repairResponse.ok) {
        throw new Error('Failed to fetch updated repair')
      }
      const repairData = await repairResponse.json()
      setRepair(repairData)

      // Reset form
      setSelectedPartId("")
      setQuantity(1)
    } catch (error) {
      console.error('Error adding part:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleRemovePart = async (partId: string) => {
    setSaving(true)
    try {
      const response = await fetch(`/api/bicycles/repairs/${params.id}/parts/${partId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to remove part')
      }

      // Refresh repair data
      const repairResponse = await fetch(`/api/bicycles/repairs/${params.id}`)
      if (!repairResponse.ok) {
        throw new Error('Failed to fetch updated repair')
      }
      const repairData = await repairResponse.json()
      setRepair(repairData)
    } catch (error) {
      console.error('Error removing part:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-4 sm:py-10 px-4 sm:px-6">
        <div className="flex justify-center items-center h-64">
          <p>Loading repair details...</p>
        </div>
      </div>
    )
  }

  if (!repair) {
    return (
      <div className="container mx-auto py-4 sm:py-10 px-4 sm:px-6">
        <div className="flex justify-center items-center h-64">
          <p>Repair not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-4 sm:py-10 px-4 sm:px-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Repair Parts</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Repair Details</CardTitle>
              <CardDescription>
                Manage parts used for this repair
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant="outline" className="mt-1">
                    {repair.status.replace(/_/g, ' ')}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Received Date</p>
                  <p className="mt-1">{format(new Date(repair.receivedDate), "PPP")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Owner Phone</p>
                  <p className="mt-1">{repair.ownerPhone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Problem Types</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {JSON.parse(repair.problemTypes).map((type: string) => (
                      <Badge key={type} variant="outline">
                        {type.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Parts Used</h3>
                {repair.partsUsed.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Part</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {repair.partsUsed.map((partUsed) => (
                        <TableRow key={partUsed.part.id}>
                          <TableCell>{partUsed.part.name}</TableCell>
                          <TableCell>{partUsed.quantity}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleRemovePart(partUsed.part.id)}
                              disabled={saving}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-muted-foreground">No parts added yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add Part</CardTitle>
              <CardDescription>
                Select a part and quantity to add to this repair
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="part">Part</Label>
                  <Select 
                    value={selectedPartId} 
                    onValueChange={setSelectedPartId}
                  >
                    <SelectTrigger id="part">
                      <SelectValue placeholder="Select a part" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableParts.map((part) => (
                        <SelectItem key={part.id} value={part.id}>
                          {part.name} (Available: {part.quantity})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    min="1" 
                    value={quantity} 
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleAddPart}
                disabled={!selectedPartId || quantity <= 0 || saving}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Part
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
} 
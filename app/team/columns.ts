export type TeamMember = {
  id: string
  familyName: string
  givenNames: string
  nationality: string | null
  photoPath: string | null
  status: "ACTIVE" | "INACTIVE"
  googleAccountActive: boolean
  startDate: Date
  endDate: Date | null
  department: string
  email: string
  phone: string
  homeAddress: string | null
  dateOfBirth: Date
  legalStatus: string
  createdAt: Date
  updatedAt: Date
} 

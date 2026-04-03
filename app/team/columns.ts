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
  secondaryEmail: string | null
  phone: string
  homeAddress: string | null
  dateOfBirth: Date
  legalStatus: string | null
  vaccinationCertificate: string | null
  liabilityInsurance: boolean | null
  accidentInsurance: boolean | null
  testCertificate: string | null
  livesInCamp: boolean | null
  legalSupportStatus: string | null
  legalSupportComment: string | null
  powerToolClearanceWood: boolean | null
  powerToolClearanceMetal: boolean | null
  weldingClearance: boolean | null
  handToolsClearance: boolean | null
  toolLiabilityWaiverSigned: boolean | null
  vaccinationComment: string | null
  driversLicenseCar: boolean | null
  registeredForMakerspaceVan: boolean | null
  registeredForOhfVan: boolean | null
  codeOfConductSigned: boolean | null
  safeguardingPolicySigned: boolean | null
  codeOfConductSignedAttachment: string | null
  codeOfConductSigningDate: Date | null
  safeguardingPolicySigningDate: Date | null
  keys: string | null
  fireSafetyTraining: boolean | null
  firstAidTraining: boolean | null
  safetyTraining: boolean | null
  cardNumber: string | null
  toolLiabilityWaiverSignedAttachment: string | null
  toolLiabilityWaiverSigningDate: Date | null
  createdAt: Date
  updatedAt: Date
} 

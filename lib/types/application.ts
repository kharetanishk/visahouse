export interface ApplicationFormData {
  name: string;
  email: string;
  phoneNumber: string;
  passportNationality: string;
  destinationCountry: string;
  preferredTravelDate: string;
  numberOfDaysOfStay: string;
  visaType:
    | "Tourist"
    | "Business"
    | "Student"
    | "Work Permit"
    | "Transit"
    | "Immigration";
  totalTravellers: number;
  numberOfAdults: number;
  numberOfChildren: number;
  documents: File[];
}

export interface Response {
  address: string;
  description: string;
  hours: ResponseHours;
  id: number;
  logo: string;
  name: string;
  phone_number: string;
  review: string;
  type: string;
  uid: string;
}

export interface ResponseHours {
  monday: ResponseHoursData;
  tuesday: ResponseHoursData;
  wednesday: ResponseHoursData;
  thursday: ResponseHoursData;
  friday: ResponseHoursData;
  saturday: ResponseHoursData;
  sunday: ResponseHoursData;
}

export interface ResponseHoursData {
  opens_at: string;
  closes_at: string;
  is_closed: boolean;
}
export interface EventFormData {
  name: string;
  startDate: Date;
  endDate: Date;
  bgColor: string;
  isPublic: boolean;
  requireApproval: boolean;
  capacity: string;
  description?: string;
  location?: string;
  tickets: {
    isFree: boolean;
    price?: number;
  };
}

export interface TimeZoneInfo {
  offset: string;
  name: string;
}

export interface EventFormData {
  name: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  description?: string;
  bgColor: string;
  isPublic: boolean;
  requireApproval: boolean;
  capacity: number | 'unlimited';
  tickets: {
    isFree: boolean;
    price?: number;
  };
}

export interface TimeZoneInfo {
  offset: string;
  name: string;
}

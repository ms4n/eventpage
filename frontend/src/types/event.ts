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
  placeId?: string;
  tickets: {
    isFree: boolean;
    price?: number;
  };
}

export interface TimeZoneInfo {
  offset: string;
  name: string;
}

export interface Event {
  id: string;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  bg_color: string;
  is_public: boolean;
  require_approval: boolean;
  capacity: string;
  location?: string;
  placeId?: string;
  tickets: {
    id: string;
    event_id: string;
    is_free: boolean;
    price?: number;
  }[];
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: number
  name: string;
  description: string;
  eventDateTime: Date | null;
  location: string;
}

export type EventForm = Omit<Event, 'id'>;

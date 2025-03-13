export interface Event {
  id: number
  name: string;
  description: string;
  eventDateTime: Date | null;
  location: string;
}

export interface TestimonialData {
  id: string;
  room: string;
  roomType: string;
  roomNumber: string;
  type: string;
  name: string;
  comment: string;
  rating: number;
}

// TestimonialItemProps.ts
export interface TestimonialItemProps {
  testimonial: TestimonialData;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

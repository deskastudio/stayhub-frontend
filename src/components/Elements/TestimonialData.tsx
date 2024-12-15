export interface TestimonialData {
  id: string;
  roomType: string;
  roomNumber: string;
  comment: string;
  rating: number;
}

// TestimonialItemProps.ts
export interface TestimonialItemProps {
  testimonial: TestimonialData;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

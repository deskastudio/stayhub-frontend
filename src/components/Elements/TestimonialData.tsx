// TestimonialData.ts
export interface TestimonialData {
  id: string;
  fullName: string;
  roomType: string;
  roomNumber: string;
  comment: string;
  rating: number; // Rating as a number
}

// TestimonialItemProps.ts
export interface TestimonialItemProps {
  testimonial: TestimonialData;
  onEdit: () => void;
  onDelete: () => void;
}

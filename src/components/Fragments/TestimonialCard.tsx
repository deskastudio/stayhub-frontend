import React from "react";
import StarRating from "../Elements/StarRating";

interface Testimonial {
  text: string;
  name: string;
  type: string;
  rating: number;
  image: string;
  alt: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => (
  <div className="border-2 border-primary rounded-3xl rounded-tl-none shadow-lg flex flex-col justify-between">
    <div className="px-6 py-6">
      <div className="text-6xl text-primary font-bold font-main h-10">“</div>
      <div className="min-h-[130px]">
        <p className="text-primary font-medium mb-4">{testimonial.text}</p>
      </div>
      <div className="text-6xl text-primary font-bold font-main text-right">”</div>
    </div>
    <div className="flex items-center mt-4 px-6 py-8 w-full border-t-2 border-primary ">
      <img
        src={testimonial.image}
        alt={testimonial.alt}
        className="w-20 h-20 rounded-full mr-4"
      />
      <div className="flex flex-col gap-1">
        <div className="font-bold font-main text-primary">
          {testimonial.name}
        </div>
        <div className="text-gray-600 text-sm">{testimonial.type}</div>
        <StarRating rating={testimonial.rating} />
      </div>
    </div>
  </div>
);

export default TestimonialCard;

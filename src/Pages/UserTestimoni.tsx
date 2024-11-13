import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import UserProfil from "../components/Fragments/ProfileUser";
import TestimonialKosong from "../components/Fragments/TestimoniKosong";
import TestimoniForm from "../components/Fragments/TestimoniForm";
import TestimonialItem from "../components/Fragments/TestimonialItem";
import { TestimonialData } from "../components/Elements/TestimonialData";

const UserTestimoni: React.FC = () => {
  const location = useLocation();
  const [step, setStep] = useState<"empty" | "form" | "list">("empty");
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [tempTestimonial, setTempTestimonial] = useState<TestimonialData | null>(null);
  const pageTitle = "Testimoni Saya";
  console.log("Current Path:", location.pathname);

  const handleAddTestimonial = () => setStep("form");

  const handleFormSubmit = (data: TestimonialData) => {
    setTestimonials((prev) => [...prev, data]); // Tambahkan testimonial ke daftar
    setStep("list"); // Kembali ke tampilan list setelah testimonial disubmit
  };

  const handleDeleteTestimonial = (index: number) => {
    setTestimonials((prev) => {
      const updatedTestimonials = prev.filter((_, i) => i !== index);
      if (updatedTestimonials.length === 0) {
        setStep("empty"); // Menampilkan TestimonialKosong jika kosong
      }
      return updatedTestimonials;
    });
  };

  const handleEditTestimonial = (index: number) => {
    const testimonialToEdit = testimonials[index];
    setTempTestimonial(testimonialToEdit);
    setTestimonials((prev) => prev.filter((_, i) => i !== index));
    setStep("form");
  };

  return (
    <div className="p-8 flex-grow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{pageTitle}</h1>
        <UserProfil />
      </div>
      <div>
        {step === "empty" && testimonials.length === 0 && <TestimonialKosong onAdd={handleAddTestimonial} />}

        {step === "form" && <TestimoniForm onSubmit={handleFormSubmit} onCancel={() => setStep(testimonials.length ? "list" : "empty")} />}

        {step === "list" && testimonials.length > 0 && (
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <TestimonialItem key={index} testimonial={testimonial} onEdit={() => handleEditTestimonial(index)} onDelete={() => handleDeleteTestimonial(index)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTestimoni;

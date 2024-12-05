import React, { useState } from "react";
import Input from "../Elements/Input";
import Button from "../Elements/Button";
import RatingFormModal from "./RatingForm";
import axios from "axios";
import { TestimonialData } from "../Elements/TestimonialData";

interface TestimonialFormProps {
  roomId: string; // ID kamar yang terkait
  onSubmit: (data: any) => void; // Callback menerima data setelah berhasil submit
  onCancel: () => void; // Callback untuk membatalkan
  editingTestimonial: TestimonialData | null; // Pass the testimonial to be edited
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({
  roomId,
  onSubmit,
  onCancel,
}) => {
  const token = sessionStorage.getItem("token");
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [isRatingModalOpen, setRatingModalOpen] = useState(false);
  const [formError, setFormError] = useState<string>("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Cek apakah form telah terisi dengan baik
    if (!comment || rating === 0) {
      setFormError("Silakan isi ulasan dan beri rating!");
      return;
    }

    console.log("Mengirim data:", { roomId, comment, rating });

    try {
      // Kirim hanya comment dan rating ke backend
      const response = await axios.post(
        `http://localhost:8000/review/${roomId}`,
        { comment, rating }, // Hanya kirim comment dan rating
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Testimoni berhasil ditambahkan:", response.data);

        // Kirimkan data yang sudah ada ke parent (hanya data yang diterima dari server)
        onSubmit(response.data);

        // Reset form setelah submit sukses
        setComment("");
        setRating(0); // Reset rating setelah sukses submit
        setFormError(""); // Reset error message
      } else {
        setFormError("Gagal menambahkan testimoni.");
      }
    } catch (error: any) {
      console.error("Error:", error.response || error);
      setFormError(
        error.response?.data?.message || "Terjadi kesalahan saat menambahkan testimoni."
      );
    }
  };

  return (
    <form
      className="space-y-6 p-6 border rounded-lg shadow-xl bg-white"
      onSubmit={handleFormSubmit}
    >
      {formError && <div className="text-red-500">{formError}</div>}

      <div className="flex flex-col">
        <Input
          label="Ulasan"
          name="comment"
          type="textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tulis ulasan Anda"
        />
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="text-lg">
          Rating: <span className="font-bold">{rating || "Belum dipilih"}</span>
        </div>
        <Button variant="add" type="button" onClick={() => setRatingModalOpen(true)}>
          Beri Rating
        </Button>
      </div>

      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="add" type="submit">
          Kirim
        </Button>
        <Button variant="detail" onClick={onCancel}>
          Batal
        </Button>
      </div>

      {isRatingModalOpen && (
        <RatingFormModal
          onClose={() => setRatingModalOpen(false)}
          onSubmit={(selectedRating) => {
            setRating(selectedRating); // Update state rating
            setRatingModalOpen(false); // Tutup modal
          }}
        />
      )}
    </form>
  );
};

export default TestimonialForm;

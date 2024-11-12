import React, { useState } from "react";
import Tombol from "../Elements/Tombol.";
import PesanKosong from "../Elements/PesanKosong";
import TestimoniForm from "../Fragments/TestimoniForm";

// Define a TypeScript interface for the testimoni data
interface TestimoniData {
  namaLengkap: string;
  tipeKamar: string;
  noKamar: string;
  testimoni: string;
  rating: number | null;
}

const KontenTestimoni: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false); // State to show form
  const [testimoni, setTestimoni] = useState<TestimoniData | null>(null); // State to store the testimoni

  const handleToggleForm = () => {
    setShowForm(true); // Show form when button is clicked
  };

  const handleCancel = () => {
    setShowForm(false); // Return to initial view (PesanKosong) when cancel is clicked
  };

  const handleTestimoniSubmit = (data: TestimoniData) => {
    setTestimoni(data); // Save the submitted testimoni data
    setShowForm(false); // Hide form after submitting
  };

  const handleDelete = () => {
    setTestimoni(null); // Delete the testimoni data
  };

  return (
    <div className="w-full min-h-screen">
      {/* Show either the form or the saved testimoni */}
      {!showForm && <Tombol label="Tambahkan Testimoni" onClick={handleToggleForm} />}
      {!showForm && !testimoni && <PesanKosong onClick={handleToggleForm} />}
      {!showForm && testimoni && (
        <div className="p-6 bg-white rounded-md shadow-lg">
          <div className="mt-4">
            <p>
              <strong>Nama Lengkap:</strong> {testimoni.namaLengkap}
            </p>
            <p>
              <strong>Type Kamar:</strong> {testimoni.tipeKamar}
            </p>
            <p>
              <strong>No Kamar:</strong> {testimoni.noKamar}
            </p>
            <p>
              <strong>Ulasan:</strong> {testimoni.testimoni}
            </p>
            <p>
              <strong>Rating:</strong> {"⭐".repeat(testimoni.rating || 0)}
            </p>
          </div>
          <div className="flex gap-4 mt-4">
            <Tombol label="Hapus" onClick={handleDelete} className="bg-red-500" />
            <Tombol label="Edit" onClick={() => setShowForm(true)} className="bg-gray-500" />
          </div>
        </div>
      )}
      {showForm && <TestimoniForm onCancel={handleCancel} onTestimoniSubmit={handleTestimoniSubmit} />}
    </div>
  );
};

export default KontenTestimoni;

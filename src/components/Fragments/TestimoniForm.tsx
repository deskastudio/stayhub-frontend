import React, { useState, useEffect } from "react";
import Rating from"./Rating";

interface TestimoniData {
  namaLengkap: string;
  tipeKamar: string;
  noKamar: number;
  testimoni: string;
  rating: number | null;
}

interface TestimoniFormProps {
  onCancel: () => void;
  onTestimoniSubmit: (data: TestimoniData) => void;
}

const TestimoniForm: React.FC<TestimoniFormProps> = ({ onCancel, onTestimoniSubmit }) => {
  const [namaLengkap, setNamaLengkap] = useState<string>("");
  const [tipeKamar, setTipeKamar] = useState<string>("Silver");
  const [noKamar, setNoKamar] = useState<number | "">("");
  const [testimoni, setTestimoni] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);
  const [showRatingForm, setShowRatingForm] = useState<boolean>(false);
  const [roomNumbers, setRoomNumbers] = useState<number[]>([]);

  const isFormComplete = () => {
    return namaLengkap.trim() !== "" && tipeKamar.trim() !== "" && noKamar !== "" && testimoni.trim() !== "";
  };

  useEffect(() => {
    // Update room numbers based on the selected room type
    if (tipeKamar === "Silver") setRoomNumbers([101, 102, 103, 104, 105, 106, 107, 108, 109, 110]);
    else if (tipeKamar === "Gold") setRoomNumbers([201, 202, 203, 204, 205, 206, 207, 208, 209, 210]);
    else if (tipeKamar === "Platinum") setRoomNumbers([301, 302, 303, 304, 305, 306, 307, 308, 309, 310]);
    setNoKamar(""); // Reset room number when type changes
  }, [tipeKamar]);

  const handleFormSubmit = () => {
    if (!isFormComplete()) {
      alert("Silakan isi semua field sebelum mengirim.");
      return;
    }
    setShowRatingForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === null) {
      alert("Silakan pilih rating terlebih dahulu.");
      return;
    }

    const data: TestimoniData = {
      namaLengkap,
      tipeKamar,
      noKamar: Number(noKamar),
      testimoni,
      rating,
    };
    onTestimoniSubmit(data);

    // Reset form
    setNamaLengkap("");
    setTipeKamar("Silver");
    setNoKamar("");
    setTestimoni("");
    setRating(null);
    setShowRatingForm(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="p-6 max-w-full mx-auto w-full border rounded-md shadow-lg bg-white space-y-6">
        {/* Nama Lengkap */}
        <div>
          <label htmlFor="namaLengkap" className="block text-sm font-medium text-gray-700">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="namaLengkap"
            value={namaLengkap}
            onChange={(e) => setNamaLengkap(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan nama lengkap"
          />
        </div>

        {/* Tipe Kamar */}
        <div>
          <label htmlFor="tipeKamar" className="block text-sm font-medium text-gray-700">
            Tipe Kamar
          </label>
          <select id="tipeKamar" value={tipeKamar} onChange={(e) => setTipeKamar(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>

        {/* No Kamar */}
        <div>
          <label htmlFor="noKamar" className="block text-sm font-medium text-gray-700">
            No Kamar
          </label>
          <select id="noKamar" value={noKamar} onChange={(e) => setNoKamar(e.target.value ? parseInt(e.target.value) : "")} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Pilih Nomor Kamar</option>
            {roomNumbers.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Testimoni */}
        <div>
          <label htmlFor="testimoni" className="block text-sm font-medium text-gray-700">
            Testimoni
          </label>
          <textarea
            id="testimoni"
            value={testimoni}
            onChange={(e) => setTestimoni(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Tulis testimoni anda..."
          />
        </div>

        {/* Tombol Kirim dan Batal */}
        <div className="flex justify-end gap-4 mt-4">
          <button type="button" onClick={handleFormSubmit} className="px-6 py-2 bg-primary text-white rounded-md">
            Kirim
          </button>
          <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition">
            Batal
          </button>
        </div>
      </form>

      {/* Rating form */}
      {showRatingForm && <Rating rating={rating} setRating={setRating} onCancel={() => setShowRatingForm(false)} onSubmit={handleSubmit} />}
    </div>
  );
};

export default TestimoniForm;

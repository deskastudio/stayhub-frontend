// BookingModal.tsx
import React from "react";
import Button from "../Elements/ButtonLanding";
import PaymentSuccessModal from "./PaymentSuccessModal";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const paymentMethods = [
  { id: 1, name: "Dana", logo: "paymentImage/dana.svg" },
  { id: 2, name: "Gopay", logo: "paymentImage/gopay.svg" },
  { id: 3, name: "LinkAja", logo: "paymentImage/linkaja.svg" },
  { id: 4, name: "BRI", logo: "paymentImage/bri.svg" },
  { id: 5, name: "BCA", logo: "paymentImage/bca.svg" },
];

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedMethod, setSelectedMethod] = React.useState<number | null>(
    null
  );
  const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = React.useState(false);

  if (!isOpen) return null; // Render nothing if the modal is not open

  const handlePayment = () => {
    // Buka PaymentSuccessModal saat pembayaran berhasil
    setIsPaymentSuccessOpen(true);
  };

  const handleClosePaymentSuccess = () => {
    setIsPaymentSuccessOpen(false);
    onClose(); // Tutup BookingModal ketika modal sukses ditutup
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-[600px] mx-auto p-6 border rounded-lg shadow-lg bg-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Pilih Metode Pembayaran</h1>
          <span className="text-xl cursor-pointer" onClick={onClose}>
            X
          </span>
        </div>
        <div className="mb-4">
          <h2 className="font-bold mb-2 text-lg">Pembayaran e-wallet</h2>
          {paymentMethods.slice(0, 3).map((method) => (
            <div
              key={method.id}
              className={`p-2 gap-4 min-h-[50px] rounded-lg mb-2 flex items-center cursor-pointer ${
                selectedMethod === method.id ? "bg-blue-200" : "bg-gray-100"
              }`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <img
                src={method.logo}
                alt={`${method.name} logo`}
                className="mr-2"
              />
              <span className="font-medium">{method.name}</span>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h2 className="font-bold mb-2 text-lg">Pembayaran virtual account</h2>
          {paymentMethods.slice(3).map((method) => (
            <div
              key={method.id}
              className={` p-2 gap-4 min-h-[50px] rounded-lg mb-2 flex items-center cursor-pointer ${
                selectedMethod === method.id ? "bg-blue-200" : "bg-gray-100"
              }`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <img
                src={method.logo}
                alt={`${method.name} logo`}
                className="mr-2"
              />
              <span className="font-medium">{method.name}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-3 mt-10">
          <Button
            custom="border border-primary py-3 text-primary"
            onClick={onClose}
          >
            Batal
          </Button>
          <Button custom="bg-secondary py-3 text-white" onClick={handlePayment}>
            Bayar
          </Button>
        </div>
      </div>
      {isPaymentSuccessOpen && (
        <PaymentSuccessModal onClose={handleClosePaymentSuccess} />
      )}
    </div>
  );
};

export default BookingModal;

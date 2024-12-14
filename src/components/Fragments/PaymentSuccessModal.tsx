
import Button from "../Elements/ButtonLanding";

interface PaymentSuccessModalProps {
  onClose: () => void;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-[600px] mx-auto p-6 border rounded-lg shadow-lg bg-white">
        <div className="flex justify-end mb-4">
          <span className="text-xl cursor-pointer" onClick={onClose}>
            X
          </span>
        </div>
        <div className="mb-4 flex flex-col items-center">
          <img src="paymentImage/payment-success.svg" alt="" className="mb-4" />
          <h1 className="text-2xl font-bold">Pembayaran Sukses</h1>
          <p className="text-center mt-2">
            Terima kasih telah melakukan pembayaran bulan Oktober
          </p>
          <div className="flex justify-center gap-3 mt-10">
            <Button custom="bg-secondary py-3 text-white" onClick={onClose}>
              Bayar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;

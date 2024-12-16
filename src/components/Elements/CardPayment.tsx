interface CardPaymentProps {
  pendapatanBulanan: string;
  bulan: string;
  totalPendapatan: string;
  penghuniBelumBayar: number;
  pembayaranBerhasil: number;
}

const CardPayment: React.FC<CardPaymentProps> = ({
  pendapatanBulanan,
  bulan,
  totalPendapatan,
  penghuniBelumBayar,
  pembayaranBerhasil,
}) => {
  return (
    <div className='bg-white p-8 rounded-lg shadow'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center space-x-4'>
          <p className='text-lg font-medium'>{pendapatanBulanan}</p>
          <i className='text-sm text-primary-dark cursor-pointer'>▼</i>
        </div>
        <div className='flex items-center space-x-4'>
          <p className='text-lg font-medium'>{bulan}</p>
          <i className='text-sm text-primary-dark cursor-pointer'>▼</i>
        </div>
      </div>
      <hr className='border-t border-primary-dark mb-4' />
      <div className='flex justify-between text-center'>
        <div className='flex-1 flex flex-col gap-2'>
          <p className='text-lg font-medium items-center'>Total Pendapatan</p>
          <p className='text-2xl font-medium text-primary'>{totalPendapatan}</p>
        </div>
        <div className='border-l border-primary-dark'></div>
        <div className='flex-1 flex flex-col gap-2'>
          <p className='text-lg font-medium'>Total Penghuni Belum Bayar</p>
          <p className='text-2xl font-medium text-primary'>
            {penghuniBelumBayar}
          </p>
        </div>
        <div className='border-l border-primary-dark'></div>
        <div className='flex-1 flex flex-col gap-2'>
          <p className='text-lg font-medium'>Pembayaran Berhasil</p>
          <p className='text-2xl font-medium text-primary'>
            {pembayaranBerhasil}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardPayment;

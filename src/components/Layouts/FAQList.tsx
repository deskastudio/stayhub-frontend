import  { useState } from 'react';
import FAQItem from '../Fragments/FAQItem';

const faqs = [
  {
    question: 'Bagaimana prosedur pemesanan kamar kos secara online?',
    answer:
      'Prosedur pemesanan kamar kost online dimulai dengan calon penghuni memilih tipe kamar, lalu mengisi formulir pemesanan. Setelah itu, calon penghuni harus melakukan pembayaran terlebih dahulu. Setelah pembayaran dikonfirmasi, mereka akan mendapatkan akses login dan bisa menikmati fasilitas kost.',
  },
  {
    question: 'Apakah tersedia kamar dengan kamar mandi dalam?',
    answer:
      'Tentu, kami menyediakan kamar dengan fasilitas kamar mandi dalam, sehingga Anda bisa menikmati kenyamanan dan privasi yang lebih selama tinggal di sini.',
  },
  {
    question: 'Kos khusus pria/wanita atau campuran?',
    answer:
      'Kosan ini bersifat campuran, dapat dihuni oleh pria dan wanita. Semua kamar disediakan dengan fasilitas yang sama untuk memastikan kenyamanan. Pengelolaan dan keamanan kosan dirancang agar cocok untuk seluruh penghuni.',
  },
  {
    question: 'Bagaimana proses pembayaran sewa dilakukan?',
    answer: (
      <div>
        <p>Proses pembayaran sewa kosan dapat dilakukan dengan cara berikut:</p>
        <ol className='list-decimal pl-5'>
          <li>
            Pemilihan Kamar: Penyewa memilih kamar yang diinginkan dan
            memastikan ketersediaan.
          </li>
          <li>
            Pembayaran Uang Muka: Penyewa membayar uang muka melalui sistem
            pembayaran di website, yang bisa menggunakan berbagai metode seperti
            transfer bank atau kartu kredit.
          </li>
          <li>
            Pembayaran Bulanan: Untuk sewa bulanan, penyewa dapat mengakses
            tagihan di website dan melakukan pembayaran secara online setiap
            bulan.
          </li>
        </ol>
      </div>
    ),
  },
];

const FAQList: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleFAQClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='container mt-10 pb-24'>
      <div className='py-2.5 text-center mb-10'>
        <h1 className='font-bold font-main text-primary text-5xl mb-3'>
          Pertanyaan
        </h1>
        <p className='font-normal text-xl'>Pertanyaan yang sering ditanyakan</p>
      </div>
      <div className='flex justify-center'>
        <div className='w-full max-w-5xl'>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleFAQClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQList;

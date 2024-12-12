
import Card from "../Fragments/Card";
import { FaSignal } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { BiSolidCctv } from "react-icons/bi";


const Facilities: React.FC = () => {
  return (
    <>
      <div className="container pb-24">
        <div className="py-2.5 text-center mb-10">
          <h1 className="font-bold font-main text-primary text-5xl">Fasilitas Utama</h1>
        </div>
        <div className="flex justify-between items-center gap-10">
          <Card
            icon={<FaSignal />}
            title="Fasilitas Internet Berkecepatan Tinggi"
            description="Akses internet cepat untuk kebutuhan kerja dan belajar"
          />
          <Card
            icon={<TbAirConditioning />}
            title="Kamar Fully Furnished dengan Desain Modern"
            description="Kamar lengkap dengan furnitur modern dan AC"
          />
          <Card
            icon={<BiSolidCctv />}
            title="Akses Keamanan 24 Jam dan CCTV"
            description="Akses aman dengan CCTV dan penjaga."
          />
        </div>
      </div>
    </>
  );
};

export default Facilities;

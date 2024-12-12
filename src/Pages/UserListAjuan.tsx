import React from 'react';
// import { useNavigate } from 'react-router-dom';
import Profile from '../components/Fragments/Profile';
import SectionHeader from '../components/Elements/SectionHeader';
// import Placeholder from '../components/Fragments/Placeholder';
// import EditAjuanModal from '../components/Fragments/EditAjuanModal';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
// import { useFetchComplaint } from '../hooks/useFetchComplaint';

interface Complaint {
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

const UserListAjuan: React.FC = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedAjuan, setSelectedAjuan] = useState<Ajuan | null>(null);
  // const navigate = useNavigate();
  // const { complaint, loading } = useFetchComplaint();
  // console.log('complaint:', complaint);

  // const handleAddAjuan = () => {
  //   navigate('/user-ajuan');
  // };

  // const handleModalClose = () => {
  //   setIsModalOpen(false);
  //   setSelectedAjuan(null);
  // };

  // const handleSaveAjuan = (updatedAjuan: Ajuan) => {
  //   // Update data ajuan
  //   const updatedAjuanList = ajuanList.map((ajuan) =>
  //     ajuan.id === updatedAjuan.id ? updatedAjuan : ajuan
  //   );
  //   setAjuanList(updatedAjuanList);
  // };

  if (loading) {
    return (
      <div className='container py-20'>
        <h1 className='text-5xl font-bold font-main text-center text-primary mb-12'>
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className='p-8 flex-grow'>
      <SectionHeader title='List Ajuan'>
        <Profile />
      </SectionHeader>

      <div>
        <table className='w-full border-collapse border'>
          <thead>
            <tr className='bg-primary-dark text-white'>
              <th className='px-4 py-2'>Tanggal</th>
              <th className='px-4 py-2'>Perihal</th>
              <th className='px-4 py-2'>Isi Ajuan</th>
              <th className='px-4 py-2'>Status</th>
            </tr>
          </thead>
          <tbody>
            {complaint && complaint.length > 0 ? (
              complaint.map((data: Complaint) => (
                <tr className='text-center'>
                  <td className='px-4 py-2 border'>
                    {data.createdAt &&
                      format(new Date(data.createdAt), 'dd MMMM yyyy', {
                        locale: id,
                      })}
                  </td>
                  <td className='px-4 py-2 border'>{data.title}</td>
                  <td className='px-4 py-2 border'>{data.description}</td>
                  <td className='px-4 py-2 border'>
                    <span
                      className={`px-2 py-1 rounded text-center w-full inline-block ${
                        data.status === 'resolved'
                          ? 'bg-green-200 text-green-700'
                          : 'bg-red-200 text-red-700'
                      }`}
                    >
                      {data.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className='text-center py-4'>
                  Belum ada complaint
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListAjuan;

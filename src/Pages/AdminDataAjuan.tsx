import { useLocation } from 'react-router-dom';
import AjuanTable from '../components/Fragments/AjuanTable';
import SectionHeader from '../components/Elements/SectionHeader';
import Profile from '../components/Fragments/Profile';

const AdminDataAjuan = () => {
  const location = useLocation();
  console.log('Current Path:', location.pathname);

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <SectionHeader title='Data Ajuan'>
        <Profile />
      </SectionHeader>

      <AjuanTable />
    </div>
  );
};

export default AdminDataAjuan;

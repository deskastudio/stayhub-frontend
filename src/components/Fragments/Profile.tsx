import React from 'react';
import ProfileInfo from '../Elements/Profile';
import { getUserName, getUserRole } from '../../utils/auth.utils';

const Profile: React.FC = () => {
  const userName = getUserName();
  const { role } = getUserRole();

  return <ProfileInfo name={userName} role={role} profileImage='profile.png' />;
};

export default Profile;

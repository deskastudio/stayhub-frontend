// import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AjuanTable from "../components/Fragments/AjuanTable";
import ProfileAdmin from "../components/Fragments/ProfileAdmin";

const AdminDataAjuan = () => {
  const pageTitle = "Data Ajuan";
  const location = useLocation();
  console.log("Current Path:", location.pathname);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{pageTitle}</h1>
        <ProfileAdmin />
      </div>
        <AjuanTable/>
      
    </div>
  );
};

export default AdminDataAjuan;

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProfileInfo from "../components/Elements/ProfileInfo";
import TypeKamarTable from "../components/Elements/TypeKamarTable";
import AdminTypeKamarTambah from "./AdminTypeKamarTambah";
import AdminTypeKamarDetail from "./AdminTypeKamarDetail";
import AdminTypeKamarEdit from "./AdminTypeKamarEdit";

const TypeKamar: React.FC = () => {
  const location = useLocation();
  
  let pageTitle = "Tipe Kamar";
  if (location.pathname === "/type-kamar/tambah") {
    pageTitle = "Tambah Type Kamar";
  } else if (location.pathname.startsWith("/type-kamar/detail")) {
    pageTitle = "Detail Type Kamar";
  } else if (location.pathname.startsWith("/type-kamar/edit")) {
    pageTitle = "Edit Type Kamar";
  }
  console.log("Current Path:", location.pathname);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{pageTitle}</h1>
        <ProfileInfo />
      </div>
        <Routes>
          <Route path="/" element={<TypeKamarTable />} />
          <Route path="tambah" element={<AdminTypeKamarTambah />} />
          <Route path="detail/:id" element={<AdminTypeKamarDetail />} />
          <Route path="edit/:id" element={<AdminTypeKamarEdit />} />
        </Routes>
      </div>
  );
};

export default TypeKamar;

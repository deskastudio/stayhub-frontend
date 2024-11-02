import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ProfileInfo from "../Elements/ProfileInfo";
import TypeKamarTable from "../Elements/TypeKamarTable";
import AdminTypeKamarTambah from "./AdminTypeKamarTambah";
import AdminTypeKamarDetail from "./AdminTypeKamarDetail";
import AdminTypeKamarEdit from "./AdminTypeKamarEdit";

const TypeKamar: React.FC = () => {
  const location = useLocation();
  
  let pageTitle = "Type Kamar";
  if (location.pathname === "/type-kamar/tambah") {
    pageTitle = "Tambah Type Kamar";
  } else if (location.pathname.startsWith("/type-kamar/detail")) {
    pageTitle = "Detail Type Kamar";
  } else if (location.pathname.startsWith("/type-kamar/edit")) {
    pageTitle = "Edit Type Kamar";
  }
  console.log("Current Path:", location.pathname);

  return (
    <MainLayout>
      <div className="p-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{pageTitle}</h1>
          <ProfileInfo />
        </div>
        <Routes>
          <Route path="/" element={<TypeKamarTable />} />
          <Route path="tambah" element={<AdminTypeKamarTambah />} />
          <Route path="detail/:id" element={<AdminTypeKamarDetail />} />
          <Route path="edit/:id" element={<AdminTypeKamarEdit />} />
        </Routes>
      </div>
    </MainLayout>
  );
};

export default TypeKamar;

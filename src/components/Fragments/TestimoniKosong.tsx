import React from "react";
import Button from "../Elements/Button";

interface TestimonialKosongProps {
  onAdd: () => void;
}

const TestimonialKosong: React.FC<TestimonialKosongProps> = ({ onAdd }) => {
  return (
    <div>
      <Button variant="add" onClick={onAdd}>
        Tambah Testimoni
      </Button>
      <div className=" bg-white rounded shadow my-10">
        <p className="bg-primary-dark font-bold text-xl text-white px-4 py-10">Belum ada testimoni yang ditulis. Silahkan tulis baru.</p>
        <p
          onClick={(e) => {
            e.preventDefault();
            onAdd();
          }}
          className="text-primary-dark font-bold text-left px-4 py-4 rounded transition cursor-pointer"
        >
          Tambah Testimoni
        </p>
      </div>
    </div>
  );
};

export default TestimonialKosong;

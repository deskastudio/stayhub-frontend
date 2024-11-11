import KontenTestimoni from "../components/Fragments/KontenTestimoni";
import ProfileUser from "../components/Fragments/ProfileUser";

const UserTestimoni = () => {
  return (
    <div className="p-8 flex-grow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Testimoni Saya</h1>
        <ProfileUser />
      </div>
      <div className="overflow-x-auto w-full">
        <KontenTestimoni />
      </div>
    </div>
  );
};

export default UserTestimoni;

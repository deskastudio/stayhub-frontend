interface Facility {
  name: string;
}

interface FacilitiesProps {
  facilities: Facility[];
}

const Facilities: React.FC<FacilitiesProps> = ({ facilities }) => {
  return (
    <div className='mt-5'>
      <h2 className='text-4xl font-bold text-primary mb-8'>Fasilitas</h2>
      <div className='flex flex-wrap gap-4 justify-start'>
        {facilities.length ? (
          facilities.map((facility, index) => (
            <div
              key={index}
              className='flex items-center bg-blue-100 px-5 py-2 rounded-xl'
            >
              <i className='text-primary text-3xl mr-2'>
                {/* {getFacilityIcon(facility.name)} */}
              </i>
              <span className='text-primary font-main'>{facility.name}</span>
            </div>
          ))
        ) : (
          <p className='text-center'>Fasilitas tidak tersedia.</p>
        )}
      </div>
    </div>
  );
};

export default Facilities;

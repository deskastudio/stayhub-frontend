interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ icon, title, description }) => {
  return (
    <div className='bg-default rounded-lg shadow-xl py-7 px-9 text-center w-full'>
      <div className='flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4'>
        <i className='text-default text-3xl'>{icon}</i>
      </div>
      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl font-bold'>{title}</h2>
        <p className=' max-w-80 mx-auto text-[20px] text-gray-500'>
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;



interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  onClick,
}) => {
  return (
    <div className='mb-4'>
      <button
        className='w-full max-w-[1012px] text-left bg-primary text-white p-4 rounded-xl flex justify-between items-center'
        onClick={onClick}
      >
        {question}
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      <div
        className={`w-full max-w-[1012px] bg-default overflow-hidden rounded-b-lg shadow-md transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100 p-4' : 'max-h-0 opacity-0 p-0'
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

export default FAQItem;

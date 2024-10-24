import React from "react";

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
    <div className="mb-4">
      <button
        className="w-full max-w-[1012px] text-left bg-primary text-white p-4 rounded-xl flex justify-between items-center"
        onClick={onClick}
      >
        {question}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="w-full max-w-[1012px] bg-default p-4 rounded-b-lg shadow-md">
          <p className="text-primary font-medium">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;

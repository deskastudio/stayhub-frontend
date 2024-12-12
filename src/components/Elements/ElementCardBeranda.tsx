

interface ElementCardProps {
  imageSrc: string;
  title: string;
  count: number;
}

const ElementCard: React.FC<ElementCardProps> = ({ imageSrc, title, count }) => {
  return (
    <div className="flex flex-col items-start p-4 border border-gray-200 rounded-lg shadow-md w-48">
      <img src={imageSrc} alt={title} className="w-8 h-8 mb-2" />
      <div className="text-gray-700 text-sm font-semibold">{title}</div>
      <div className="text-black text-xl font-bold">{count}</div>
    </div>
  );
};

export default ElementCard;

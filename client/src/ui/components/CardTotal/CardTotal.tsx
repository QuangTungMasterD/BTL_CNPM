function CardTotal({
  icon,
  name,
  total,
}: {
  icon: React.ReactNode;
  name: string;
  total: number;
}) {
  return (
    <div className="
    nth-[9n+1]:bg-green-600
    nth-[9n+2]:bg-blue-600
    nth-[9n+3]:bg-red-600
    nth-[9n+4]:bg-yellow-500
    nth-[9n+5]:bg-gray-400
    nth-[9n+6]:bg-sky-500
    nth-[9n+7]:bg-violet-500
    text-white p-4 rounded-xl">
      <div className="text-3xl">{icon}</div>
      <div className="text-md my-1">{name}</div>
      <div className="text-2xl">{total}</div>
    </div>
  );
}

export default CardTotal;

import { BadgeDollarSign } from "lucide-react";

export default function DashboradLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="container flex gap-4 bg-[#FFF539] items-center h-20 rounded-xl shadow-md shadow-yellow-200">
        <BadgeDollarSign size={48} />
        <h1 className="text-3xl  font-black">Personal Finance</h1>
      </div>
      <div className="container items-center gap-4 m-auto rounded-xl shadow-md shadow-yellow-200 bg-[#FCFFA9] mt-2">
        {children}
      </div>
    </div>
  );
}

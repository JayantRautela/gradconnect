import { Calendar, Eye } from "lucide-react";
import { Button } from "./ui/button";

interface SessionCardProps {
  maxParticipant: number;
  title: string;
  time: string;
  name: string;
  currentCompany: string;
  onClick: () => void; 
}

export default function SessionCard ({ time, title, currentCompany, onClick, name, maxParticipant }: SessionCardProps) {
  const isoString = time;
  const dateObj = new Date(isoString);

  const date = dateObj.toISOString().split("T")[0]; 
  const timeOfSession = dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-sm">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h3>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <p className="text-sm font-semibold">Time :- </p>
            <span className="text-sm font-medium">{timeOfSession}</span>
          </div>
          <div className="flex items-center">
            <p className="text-sm font-semibold">Date :- </p>
            <span className="text-sm font-medium">{date}</span>
          </div>
          
          <div className="flex items-center mb-2">
            <p className="text-sm font-semibold">Alumni :- </p>
            <span className="text-sm font-medium">{name}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <p className="text-sm font-semibold">Current Company :- </p>
            <span className="text-sm font-medium">{currentCompany}</span>
          </div>
          <div className="flex items-center">
            <p className="text-sm font-semibold">Maximum Participant :- </p>
            <span className="text-sm font-medium">{maxParticipant}</span>
          </div>
        </div>
        <Button variant={"outline"} onClick={onClick} className="cursor-pointer mt-3">
          <Eye />
          View Details
        </Button>
      </div>
    </div>
  );
};
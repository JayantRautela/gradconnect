import { Calendar } from "lucide-react";

interface EventCardProps {
  eventBannerUrl?: string;
  title: string;
  place: string;
  time: string;
  mode: string
}

export default function EventCard ({ eventBannerUrl, title, place, time, mode }: EventCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-sm">
      <div className="aspect-video w-full overflow-hidden">
        {
          eventBannerUrl ? (
            <img
              src={eventBannerUrl}
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <Calendar className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          )
        }
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h3>
        
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-medium">{place}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">{time}</span>
            <span className="text-sm font-medium">{mode}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
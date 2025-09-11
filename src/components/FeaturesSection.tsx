import { Users, Calendar, Handshake, Heart, TrendingUp, Settings } from "lucide-react";

const features = [
  {
    icon: Users,
    iconBg: "bg-blue bg-opacity-10",
    iconColor: "text-blue-500",
    title: "Alumni Directory",
    description: "Search and connect with alumni by graduation year, field, industry, location, or interests. Build your professional network with ease.",
    tag: "Network Building"
  },
  {
    icon: Calendar,
    iconBg: "bg-alumni-green bg-opacity-10",
    iconColor: "text-green-500",
    title: "Events & Reunions",
    description: "Stay informed about alumni events, reunions, job networking opportunities, RSVP and connect with attendees.",
    tag: "Community Events"
  },
  {
    icon: Handshake,
    iconBg: "bg-alumni-purple bg-opacity-10",
    iconColor: "text-purple-500",
    title: "Mentorship Program",
    description: "Connect experienced alumni with current students and recent graduates. Share knowledge and guide the next generation.",
    tag: "Career Growth"
  },
  {
    icon: Heart,
    iconBg: "bg-alumni-red bg-opacity-10",
    iconColor: "text-red-500",
    title: "Give Back",
    description: "Support your alma mater through donations, volunteering, and sharing job opportunities with fellow alumni.",
    tag: "Impact & Legacy"
  },
  {
    icon: TrendingUp,
    iconBg: "bg-alumni-purple bg-opacity-10",
    iconColor: "text-purple-500",
    title: "Career Services",
    description: "Access exclusive job postings, career resources, and professional development opportunities from your network.",
    tag: "Professional Development"
  },
  {
    icon: Settings,
    iconBg: "bg-alumni-yellow bg-opacity-10",
    iconColor: "text-yellow-500",
    title: "Admin Tools",
    description: "Comprehensive administrative dashboard for managing alumni data, events, and engagement analytics for institutions.",
    tag: "Management Platform"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Stay Connected
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive tools to maintain lifelong connections with your alma mater and 
            fellow alumni
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-16 h-16 rounded-xl ${feature.iconBg} flex items-center justify-center mb-6`}>
                <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {feature.description}
              </p>
              
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                {feature.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
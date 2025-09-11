import { Shield, Clock, Smartphone, CheckCircle } from "lucide-react";

const BridgingSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Bridging generations of excellence
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Bridging generations of excellence AlumniConnect was born 
              from the vision of creating lasting bonds between educational 
              institutions and their graduates. We understand that alumni are 
              ambassadors, mentors, and the living legacy of academic 
              excellence.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our platform empowers institutions to maintain meaningful 
              relationships with their alumni while providing graduates with 
              valuable networking and growth opportunities.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-alumni-green" />
                <span className="text-gray-700 font-medium">Secure, privacy-focused platform</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-alumni-green" />
                <span className="text-gray-700 font-medium">24/7 technical support</span>
              </div>
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-alumni-green" />
                <span className="text-gray-700 font-medium">Mobile-responsive design</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={'/secondary.png'}
              alt="Diverse group of alumni representing different generations"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BridgingSection;
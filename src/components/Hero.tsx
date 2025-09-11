'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500 bg-opacity-10 text-alumni-blue mb-6">
              Connecting 10,000+ Alumni
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Your Alumni Network{" "}
              <span className="block text-alumni-blue">Awaits</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with fellow alumni, access exclusive opportunities, 
              mentor the next generation, and build lasting relationships 
              that span careers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer px-8 py-3 text-lg"
                onClick={() => router.push('/sign-in')}
              >
                Join the Network
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-blue-200 hover:bg-blue-400 hover:text-white px-8 py-3 text-lg cursor-pointer"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={'/hero-image.png'} 
              alt="Alumni network illustration showing hands reaching for graduation caps"
              className="w-full h-auto max-w-lg mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
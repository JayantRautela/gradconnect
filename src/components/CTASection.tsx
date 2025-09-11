import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-green-100 via-blue-50 to-purple-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          Ready to transform your alumni experience?
        </h2>
        
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join our growing community of institutions and alumni using our integrated 
          connecting strategy, more meaningful connections that last a lifetime.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-8 py-4 text-lg"
          >
            Start Your Network
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-alumni-blue text-alumni-blue hover:bg-blue-500 cursor-pointer hover:text-white px-8 py-4 text-lg"
          >
            Schedule a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
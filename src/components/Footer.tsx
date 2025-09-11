import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
              </li>
              <li>
                  <Link href={'/student/sign-up'} className="text-gray-600 hover:text-blue-500 transition-colors">Student</Link>
              </li>
              <li>
                  <Link href={'/admin/sign-up'} className="text-gray-600 hover:text-blue-500 transition-colors">Admin</Link>
              </li>
              <li>
                  <Link href={'/alumni/sign-up'} className="text-gray-600 hover:text-blue-500 transition-colors">Alumni</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-alumni-blue transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-alumni-blue transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-alumni-blue transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-alumni-blue transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Empowering educational institutions to build lasting 
              relationships with their alumni through innovative technology 
              and meaningful connections.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500">
            2025 AlumniConnect. All rights reserved. Connecting alumni, empowering futures worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
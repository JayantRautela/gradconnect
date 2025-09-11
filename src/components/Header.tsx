'use client';
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const redirect = () => {
    router.push('/sign-in');
  }
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900">GradConnect</span>
          </div>
          
          <nav className="flex items-center md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-alumni-blue transition-colors">
              Platforms
            </a>
            <a href="#" className="text-gray-700 hover:text-alumni-blue transition-colors">
              About
            </a>
            <div className="relative group">
              {/* <button className="flex items-center text-gray-700 hover:text-alumni-blue transition-colors">
                For Admin
                <ChevronDown className="ml-1 h-4 w-4" />
              </button> */}
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin"><Link href={'/admin/sign-up'}>Admin</Link></SelectItem>
                  <SelectItem value="alumni"><Link href={'/alumni/sign-up'}>alumni</Link></SelectItem>
                  <SelectItem value="student"><Link href={'/student/sign-up'}>Student</Link></SelectItem>
                </SelectContent>
              </Select>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="outline" className="hidden sm:inline-flex cursor-pointer" onClick={redirect}>
              Sign In
            </Button>
            {/* <Button className="bg-alumni-blue hover:bg-blue-600 text-white">
              Get Started
            </Button> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
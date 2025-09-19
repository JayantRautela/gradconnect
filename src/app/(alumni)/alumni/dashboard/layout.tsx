'use client'
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Users, 
  Clock, 
  GraduationCap, 
  User,
  Calendar
} from "lucide-react";

const sidebarItems = [
    {
        title: "Mentorship",
        href: "/alumni/dashboard/mentorship",
        icon: Calendar
    },
    {
      title: "Events",
      href: "/alumni/dashboard/events",
      icon: Calendar
    },
    {
        title: "Profile",
        href: "/alumni/dashboard/profile",
        icon: User,
    },
];

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const alumni = session?.user.alumni;
  return (
    <main>
        <nav className="p-4 md:p-2 shadow-md bg-gray-100">
          <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
            <div className="flex gap-2 items-center">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-semibold text-blue-500">GradConnect</span>
            </div>
            {
              session ? (
                <>
                  <span className='mr-4'>Welcome, {alumni?.name}</span>
                  <Button className='w-full md:w-auto cursor-pointer' onClick={() => signOut()}>Logout</Button>
                </>
              ) : (
                <Link href='/sign-in'>
                  <Button className='w-full md:w-auto cursor-pointer'>
                    Login
                  </Button>
                </Link>
              )
            }
          </div>
        </nav>
        <div className="min-h-screen bg-[#ffffff] flex">
      <aside className="w-64 bg-[#282c34] h-screen">
        <div className="p-4 border-b border-[#e5e7eb] border-opacity-20">
          <h2 className="text-xl font-bold text-[#e0e2e5]">
            Alumni Panel
          </h2>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${isActive
                    ? "bg-[#3273f5] text-white shadow-lg"
                    : "text-[#e0e2e5] hover:bg-[#373d48] hover:text-white"
                  }
                `}
              >
                <item.icon size={20} className="flex-shrink-0" />
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <main className="p-6">{children}</main>
      </div>
    </div>
    </main>
  );
}

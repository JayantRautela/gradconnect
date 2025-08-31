'use client'
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();
  const admin = session?.user.admin;
  return (
    <main>
        <nav className="p-4 md:p-2 shadow-md bg-gray-50">
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
                  <span className='mr-4'>Welcome, {admin?.collegeName}</span>
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
        {children}
    </main>
  );
}

'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z  from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/schemas/signInSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import axios from "axios";
import LoginPageCard from "@/components/LoginPageCard";
import { Users, Calendar, MessageCircle, Heart, Loader2, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export default function Login () {
  const features = [
    {
      icon: Users,
      title: "Alumni Network",
      description: "Connect with fellow alumni, build professional networks, and discover opportunities.",
      iconColor: "bg-blue-500"
    },
    {
      icon: Calendar,
      title: "Events & Reunions",
      description: "Stay updated on alumni events, reunions, and networking opportunities.",
      iconColor: "bg-green-500"
    },
    {
      icon: MessageCircle,
      title: "Mentorship",
      description: "Mentor current students or find mentors to guide your career journey.",
      iconColor: "bg-purple-500"
    },
    {
      icon: Heart,
      title: "Give Back",
      description: "Support your alma mater through donations, volunteering, and sharing opportunities.",
      iconColor: "bg-pink-500"
    }
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
    
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      setIsSubmitting(true);

      const result = await signIn('credentials', {
        redirect: false,
        identifier: data.identifier,
        password: data.password
      });

      console.log(result);

      if (result?.error) {
        form.reset({ identifier: "", password: "" });
        toast.error("Incorrect username or password");
      }

      if (result?.ok) {
        const { data: session } = await axios.get<SessionResponse>("/api/auth/session");
        if (session?.user?.role === "ADMIN") {
          router.replace('/admin/dashboard');
        } else if (session?.user?.role === "ALUMNI" || session?.user?.role === "STUDENT") {
          router.replace('/feed');
        } else {
          router.replace('/');
        }

        form.reset({ identifier: "", password: "" });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-8 bg-blue-500 rounded-2xl flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to{" "}
            <span className="text-blue-500">GradConnect</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive platform connecting alumni, fostering mentorship, and 
            building lasting institutional relationships.
          </p>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <LoginPageCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                iconColor={feature.iconColor}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="w-full max-w-md mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Access Your Account</CardTitle>
            <CardDescription className="text-gray-600">
              Login to connect with your alumni community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="identifier"
                  disabled={isSubmitting}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe12@gmail.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  disabled={isSubmitting}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full cursor-pointer h-10" disabled={isSubmitting}>
                  {
                    isSubmitting ? (
                      <><Loader2 className="animate-spin w-4 h-4"/>Please Wait</>
                    ) : ("Login")
                  }
                </Button>
              </form>
            </Form>

            <div className="text-center mt-4">
              <div>
                Don't Have an Account ? <br />
                <div className="mt-3 flex gap-2">
                  <Button variant={"outline"}>
                    <Link href="/alumni/sign-up" >
                      Alumni Sign up
                    </Link>
                  </Button>
                  <Button variant={"outline"}>
                    <Link href="/student/sign-up" >
                      Student Sign up
                    </Link>
                  </Button>
                  <Button variant={"outline"}>
                    <Link href="/admin/sign-up" >
                      Admin Sign up
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </section>
    </div>
  )
}
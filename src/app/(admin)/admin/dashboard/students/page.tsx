'use client';
import { useEffect, useState } from "react";
import { Search, Filter, Plus, Mail, Phone, MapPin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios, { AxiosError } from "axios";
import { GetCourseResponse, GetPassoutYearsResponse } from "@/types/ApiResponse";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";

const mockAlumni = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com", 
    phone: "+1 (555) 123-4567",
    graduationYear: "2020",
    department: "Computer Science",
    currentPosition: "Software Engineer",
    company: "Google",
    location: "San Francisco, CA",
    status: "verified"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678", 
    graduationYear: "2019",
    department: "Business Administration",
    currentPosition: "Product Manager",
    company: "Microsoft",
    location: "Seattle, WA",
    status: "verified"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+1 (555) 345-6789",
    graduationYear: "2021",
    department: "Electrical Engineering", 
    currentPosition: "Hardware Engineer",
    company: "Tesla",
    location: "Austin, TX",
    status: "verified"
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "+1 (555) 456-7890",
    graduationYear: "2018",
    department: "Marketing",
    currentPosition: "Marketing Director",
    company: "Meta",
    location: "Menlo Park, CA", 
    status: "pending"
  }
];

export default function AlumniDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState<Course[] | undefined>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<GetCourseResponse>('/api/admin/current-courses');
        const message = response.data.message;
        toast.success(message);
        setCourses(response.data.courses);
      } catch (error) {
        const axiosError = error as AxiosError<GetCourseResponse>;
        const message = axiosError.response?.data.message || "Some Error Occured";
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [])

  const filteredAlumni = mockAlumni.filter(alumni => {
    const matchesSearch = alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch 
  });

  const getAllStudentByCourse = async (course: Course) => {
    router.push(`/admin/dashboard/students/${course}`);
  }

  return (
    <div className="space-y-6">
      {
        isLoading ?  (
          <div>Loading</div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Student Directory</h2>
                <p className="text-muted-foreground">Manage and view all registered students</p>
              </div>
              {/* <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus size={16} className="mr-2" />
                Add Alumni
              </Button> */}
            </div>

            {/* <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 transform-translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search alumni by name, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-foreground">{mockAlumni.length}</div>
                  <p className="text-muted-foreground">Total Alumni</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-green-600">
                    {mockAlumni.filter(a => a.status === "verified").length}
                  </div>
                  <p className="text-muted-foreground">Verified</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-yellow-600">
                    {mockAlumni.filter(a => a.status === "pending").length}
                  </div>
                  <p className="text-muted-foreground">Pending</p>
                </CardContent>
              </Card>
            </div> */}


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* {filteredAlumni.map((alumni) => (
                <Card key={alumni.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold">{alumni.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">Class of {alumni.graduationYear}</p>
                      </div>
                      <Badge 
                        variant={alumni.status === 'verified' ? 'default' : 'secondary'}
                        className={alumni.status === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {alumni.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium text-foreground">{alumni.currentPosition}</p>
                      <p className="text-sm text-muted-foreground">{alumni.company}</p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap size={14} />
                        <span>{alumni.department}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail size={14} />
                        <span>{alumni.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone size={14} />
                        <span>{alumni.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin size={14} />
                        <span>{alumni.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))} */}
              {
                courses?.map((course, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => getAllStudentByCourse(course)}>
                    <CardContent>{course}</CardContent>
                  </Card>
                ))
              }
            </div>
            
            {/* {filteredAlumni.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No alumni found matching your criteria.</p>
              </div>
            )} */}
          </>
        )
      }
    </div>
  );
}
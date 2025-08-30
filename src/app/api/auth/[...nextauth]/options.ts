import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentails",
            credentials: {
                identifier: { label: "Email", type: "email"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                console.log("Credentials received:", credentials);

                try {

                    const user = await prisma.user.findFirst({
                        where: {
                            email: credentials.identifier,
                        },
                        include: {
                            student: true,
                            alumni: true,
                            admin: true
                        }
                    });

                    console.log(user);
                    if (!user) throw new Error("No user found with this email");

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password!);
                    if (!isPasswordCorrect) throw new Error("Incorrect Password");

                    if (user.role === "ALUMNI" && user.alumni && !user.alumni.isVerified) {
                        throw new Error("Your account is not verified yet. Please wait for admin approval.");
                    }
                    if (user.role === "STUDENT" && user.student && !user.student.isVerified) {
                        throw new Error("Verify yourself by entering the OTP send via email");
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                        student: user.student
                            ? {
                                id: user.student.id,
                                name: user.student.name,
                                course: user.student.course,
                                branch: user.student.branch,
                                isVerified: user.student.isVerified,
                                currentYear: user.student.currentYear,
                                profilePictureUrl: user.student.ProfilePictureUrl,
                            }
                            : undefined,
                        alumni: user.alumni
                            ? {
                                id: user.alumni.id,
                                name: user.alumni.name,
                                phoneNumber: user.alumni.phoneNumber,
                                currentCompany: user.alumni.currentCompany,
                                yearOfExperience: user.alumni.yearOfExperience,
                                passoutYear: user.alumni.passoutYear,
                                isVerified: user.alumni.isVerified,
                                branch: user.alumni.branch,
                                course: user.alumni.course,
                                profilePictureUrl: user.alumni.ProfilePictureUrl,
                                linkedinProfileUrl: user.alumni.linkedinProfileUrl,
                                portfolioLink: user.alumni.portfolioLink,
                            }
                            : undefined,
                        admin: user.admin
                            ? {
                                id: user.admin.id,
                                collegeName: user.admin.CollegeName,
                                acceptedDomain: user.admin.acceptedDomain,
                            }
                            : undefined,
                    };
                } catch (error: any) {
                    throw new Error(error);
                }
            },
        })
    ],
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.admin = token.admin;
                session.user.alumni = token.alumni;
                session.user.student = token.student;
                session.user.role = token.role;
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.admin = user.admin;
                token.alumni = user.alumni;
                token.student = user.student;
                token.role = user.role;
            }
            return token;
        }
    }
}
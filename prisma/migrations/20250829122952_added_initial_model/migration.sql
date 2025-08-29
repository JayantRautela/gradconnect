-- CreateEnum
CREATE TYPE "public"."Course" AS ENUM ('BTECH', 'MTECH', 'BCA', 'MCA', 'BSC', 'MSC', 'MBBS', 'BBA', 'MBA', 'PHD', 'BPHARMA', 'MPHARMA', 'BVOC', 'MVOC');

-- CreateEnum
CREATE TYPE "public"."Year" AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH');

-- CreateTable
CREATE TABLE "public"."Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "course" "public"."Course" NOT NULL,
    "branch" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verifyCode" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "currentYear" "public"."Year" NOT NULL,
    "ProfilePictureUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Alumni" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "cgpa" DECIMAL(65,30) NOT NULL,
    "currentCompany" TEXT NOT NULL,
    "yearOfExperience" DECIMAL(65,30) NOT NULL,
    "passoutYear" INTEGER NOT NULL,
    "isOpenToTakeMentorshipSession" BOOLEAN NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "ProfilePictureUrl" TEXT,
    "branch" TEXT NOT NULL,
    "course" "public"."Course" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Alumni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" TEXT NOT NULL,
    "CollegeName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "acceptedDomain" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "public"."Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Alumni_email_key" ON "public"."Alumni"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Alumni_phoneNumber_key" ON "public"."Alumni"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "public"."Admin"("email");

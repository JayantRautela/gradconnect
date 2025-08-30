/*
  Warnings:

  - Added the required column `linkedinProfileUrl` to the `Alumni` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Alumni" ADD COLUMN     "linkedinProfileUrl" TEXT NOT NULL,
ADD COLUMN     "portfolioLink" TEXT;

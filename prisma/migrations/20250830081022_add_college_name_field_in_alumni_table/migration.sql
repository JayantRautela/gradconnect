/*
  Warnings:

  - Added the required column `collegeName` to the `Alumni` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Alumni" ADD COLUMN     "collegeName" TEXT NOT NULL;

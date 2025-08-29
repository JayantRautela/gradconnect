/*
  Warnings:

  - Added the required column `password` to the `Alumni` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Alumni" ADD COLUMN     "password" TEXT NOT NULL;

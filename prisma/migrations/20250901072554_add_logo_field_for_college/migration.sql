/*
  Warnings:

  - Added the required column `collegeLogo` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Admin" ADD COLUMN     "collegeLogo" TEXT NOT NULL;

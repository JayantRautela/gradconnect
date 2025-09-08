/*
  Warnings:

  - Added the required column `maxParticipant` to the `Mentorship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Mentorship" ADD COLUMN     "maxParticipant" INTEGER NOT NULL;

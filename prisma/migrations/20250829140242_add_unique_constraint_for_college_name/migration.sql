/*
  Warnings:

  - A unique constraint covering the columns `[CollegeName]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Admin_CollegeName_key" ON "public"."Admin"("CollegeName");

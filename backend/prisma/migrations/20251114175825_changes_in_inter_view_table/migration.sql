/*
  Warnings:

  - Added the required column `experience` to the `interviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `interviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tech_stack` to the `interviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "interviews" ADD COLUMN     "experience" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "tech_stack" TEXT NOT NULL;

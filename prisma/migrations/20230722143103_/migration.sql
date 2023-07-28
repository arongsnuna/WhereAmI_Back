/*
  Warnings:

  - Added the required column `file_name` to the `Landmark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Landmark" ADD COLUMN     "file_name" TEXT NOT NULL;

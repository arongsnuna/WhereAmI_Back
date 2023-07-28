/*
  Warnings:

  - You are about to drop the column `areaId` on the `Landmark` table. All the data in the column will be lost.
  - You are about to alter the column `landmark_name` on the `Landmark` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `address` on the `Landmark` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `area_id` to the `Landmark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Landmark" DROP CONSTRAINT "Landmark_areaId_fkey";

-- DropIndex
DROP INDEX "Area_siDo_key";

-- AlterTable
ALTER TABLE "Landmark" DROP COLUMN "areaId",
ADD COLUMN     "area_id" INTEGER NOT NULL,
ALTER COLUMN "landmark_name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "address" SET DATA TYPE VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Landmark" ADD CONSTRAINT "Landmark_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "Area"("area_id") ON DELETE RESTRICT ON UPDATE CASCADE;

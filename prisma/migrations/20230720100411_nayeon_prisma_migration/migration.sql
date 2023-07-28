-- CreateTable
CREATE TABLE "Area" (
    "area_id" SERIAL NOT NULL,
    "siDo" TEXT NOT NULL,
    "siGu" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("area_id")
);

-- CreateTable
CREATE TABLE "Landmark" (
    "landmark_id" SERIAL NOT NULL,
    "landmark_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "image_path" TEXT NOT NULL,
    "areaId" INTEGER NOT NULL,

    CONSTRAINT "Landmark_pkey" PRIMARY KEY ("landmark_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Area_siDo_key" ON "Area"("siDo");

-- CreateIndex
CREATE UNIQUE INDEX "Area_siGu_key" ON "Area"("siGu");

-- CreateIndex
CREATE UNIQUE INDEX "Landmark_landmark_name_key" ON "Landmark"("landmark_name");

-- AddForeignKey
ALTER TABLE "Landmark" ADD CONSTRAINT "Landmark_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("area_id") ON DELETE RESTRICT ON UPDATE CASCADE;

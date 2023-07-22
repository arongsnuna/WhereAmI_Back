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
    "landmark_name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "image_path" TEXT NOT NULL,
    "area_id" INTEGER NOT NULL,

    CONSTRAINT "Landmark_pkey" PRIMARY KEY ("landmark_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Landmark_landmark_name_key" ON "Landmark"("landmark_name");

-- AddForeignKey
ALTER TABLE "Landmark" ADD CONSTRAINT "Landmark_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "Area"("area_id") ON DELETE RESTRICT ON UPDATE CASCADE;

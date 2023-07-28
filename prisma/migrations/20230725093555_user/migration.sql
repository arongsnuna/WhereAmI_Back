-- CreateTable
CREATE TABLE "User" (
    "landmark_id" SERIAL NOT NULL,
    "nickName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "profile_path" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("landmark_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nickName_key" ON "User"("nickName");

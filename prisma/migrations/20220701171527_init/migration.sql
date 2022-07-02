-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "class" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

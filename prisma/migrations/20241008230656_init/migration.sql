-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "reads" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

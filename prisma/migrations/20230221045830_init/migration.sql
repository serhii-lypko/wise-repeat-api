-- CreateTable
CREATE TABLE "WordPair" (
    "id" TEXT NOT NULL,
    "eng" TEXT NOT NULL,
    "ru" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isLearned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "WordPair_pkey" PRIMARY KEY ("id")
);

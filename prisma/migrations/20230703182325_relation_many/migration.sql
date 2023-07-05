/*
  Warnings:

  - You are about to drop the column `novelId` on the `Author` table. All the data in the column will be lost.
  - Added the required column `desccription` to the `Novel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Author" DROP CONSTRAINT "Author_novelId_fkey";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "novelId";

-- AlterTable
ALTER TABLE "Novel" ADD COLUMN     "desccription" TEXT NOT NULL,
ALTER COLUMN "createAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updateAt" SET DATA TYPE TIMESTAMPTZ(6);

-- CreateTable
CREATE TABLE "NovelOnAuthor" (
    "id" TEXT NOT NULL,
    "novelId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NovelOnAuthor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NovelOnAuthor" ADD CONSTRAINT "NovelOnAuthor_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Novel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NovelOnAuthor" ADD CONSTRAINT "NovelOnAuthor_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `achivements` to the `details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "details" ADD COLUMN     "achivements" TEXT NOT NULL,
ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "bio" VARCHAR(255) NOT NULL,
ADD COLUMN     "city" VARCHAR(255) NOT NULL,
ADD COLUMN     "country" VARCHAR(255) NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "resume" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "state" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "skill_name" VARCHAR(300) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

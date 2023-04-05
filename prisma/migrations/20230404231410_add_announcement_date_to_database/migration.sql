/*
  Warnings:

  - Added the required column `announcement_date` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `announcement_date` DATETIME(3) NOT NULL;

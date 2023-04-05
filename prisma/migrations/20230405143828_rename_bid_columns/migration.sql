/*
  Warnings:

  - You are about to drop the column `bid_post` on the `bids` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,bid_post_id]` on the table `Bids` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bid_post_id` to the `Bids` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bids` DROP FOREIGN KEY `Bids_bid_post_fkey`;

-- DropIndex
DROP INDEX `Bids_user_id_bid_post_key` ON `bids`;

-- AlterTable
ALTER TABLE `bids` DROP COLUMN `bid_post`,
    ADD COLUMN `bid_post_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Bids_user_id_bid_post_id_key` ON `Bids`(`user_id`, `bid_post_id`);

-- AddForeignKey
ALTER TABLE `Bids` ADD CONSTRAINT `Bids_bid_post_id_fkey` FOREIGN KEY (`bid_post_id`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[user_id,bid_post]` on the table `Bids` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `value` to the `Bids` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bids` ADD COLUMN `value` DOUBLE NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Bids_user_id_bid_post_key` ON `Bids`(`user_id`, `bid_post`);

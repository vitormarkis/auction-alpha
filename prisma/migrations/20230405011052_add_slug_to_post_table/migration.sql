-- DropIndex
DROP INDEX `Post_slug_key` ON `post`;

-- AlterTable
ALTER TABLE `post` MODIFY `slug` VARCHAR(191) NOT NULL DEFAULT 'slug';

/*
  Warnings:

  - You are about to drop the column `repliedToId` on the `comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_repliedToId_fkey`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `repliedToId`,
    ADD COLUMN `commentId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

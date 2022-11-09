-- AlterTable
ALTER TABLE `comment` ADD COLUMN `repliedToId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_repliedToId_fkey` FOREIGN KEY (`repliedToId`) REFERENCES `comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE `Blog` DROP FOREIGN KEY `Blog_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `ContactNotes` DROP FOREIGN KEY `ContactNotes_authorId_fkey`;

-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactNotes` ADD CONSTRAINT `ContactNotes_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

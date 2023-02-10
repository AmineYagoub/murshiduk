/*
  Warnings:

  - You are about to drop the column `notes` on the `Contact` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- AlterTable
ALTER TABLE `Contact` DROP COLUMN `notes`;

-- CreateTable
CREATE TABLE `ContactNotes` (
    `id` VARCHAR(191) NOT NULL,
    `content` TEXT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `contactId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);

-- AddForeignKey
ALTER TABLE `ContactNotes` ADD CONSTRAINT `ContactNotes_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactNotes` ADD CONSTRAINT `ContactNotes_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contact`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

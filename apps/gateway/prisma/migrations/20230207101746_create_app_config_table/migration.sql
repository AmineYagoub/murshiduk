/*
  Warnings:

  - Added the required column `updated` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `title` VARCHAR(191) NULL DEFAULT '';

-- CreateTable
CREATE TABLE `App` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `title` VARCHAR(70) NOT NULL DEFAULT 'إسم الموقع',
    `description` VARCHAR(255) NULL DEFAULT '',
    `bio` JSON NULL,
    `agreement` TEXT NOT NULL,
    `privacy` TEXT NOT NULL,
    `aboutUs` TEXT NOT NULL,
    `contactEmail` VARCHAR(255) NULL DEFAULT '',
    `youtubeUrl` VARCHAR(255) NULL DEFAULT '',
    `twitterUrl` VARCHAR(255) NULL DEFAULT '',
    `facebookUrl` VARCHAR(255) NULL DEFAULT '',
    `instagramUrl` VARCHAR(255) NULL DEFAULT '',
    `playStorUrl` VARCHAR(255) NULL DEFAULT '',
    `appStorUrl` VARCHAR(255) NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);

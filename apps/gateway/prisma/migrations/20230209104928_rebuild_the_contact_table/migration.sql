-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- AlterTable
ALTER TABLE `Contact` ADD COLUMN `notes` JSON NULL,
    ADD COLUMN `status` ENUM('NEW', 'OPEN', 'OPEN_DEAL', 'CONNECTED', 'NEGATIVE') NOT NULL DEFAULT 'NEW';

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);

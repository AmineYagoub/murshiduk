-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- AlterTable
ALTER TABLE `Service` ADD COLUMN `type` ENUM('TRAVEL', 'SERVICE') NOT NULL DEFAULT 'SERVICE';

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);

-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- AlterTable
ALTER TABLE `App` MODIFY `contactEmail` VARCHAR(100) NULL DEFAULT '',
    MODIFY `whatsApp` VARCHAR(100) NULL DEFAULT '',
    MODIFY `messengerId` VARCHAR(100) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `Blog` MODIFY `title` VARCHAR(500) NOT NULL,
    MODIFY `slug` VARCHAR(500) NOT NULL,
    MODIFY `descriptionMeta` VARCHAR(500) NOT NULL;

-- AlterTable
ALTER TABLE `Service` MODIFY `type` ENUM('TRAVEL', 'SERVICE', 'PROGRAM') NOT NULL DEFAULT 'SERVICE';

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);

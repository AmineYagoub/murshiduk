/*
  Warnings:

  - You are about to drop the column `decsription` on the `Blog` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[descriptionMeta]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `descriptionMeta` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Blog_decsription_key` ON `Blog`;

-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- AlterTable
ALTER TABLE `Blog` DROP COLUMN `decsription`,
    ADD COLUMN `descriptionMeta` VARCHAR(200) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Blog_descriptionMeta_key` ON `Blog`(`descriptionMeta`);

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);

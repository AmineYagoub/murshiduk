/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);

-- CreateIndex
CREATE UNIQUE INDEX `Role_title_key` ON `Role`(`title`);

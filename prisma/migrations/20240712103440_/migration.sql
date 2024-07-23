/*
  Warnings:

  - You are about to drop the column `ProductId` on the `stock` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `CartContent_CartId_fkey` ON `cartcontent`;

-- DropIndex
DROP INDEX `CartContent_productId_fkey` ON `cartcontent`;

-- DropIndex
DROP INDEX `Product_CategoryId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Stock_ProductId_fkey` ON `stock`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `typeId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `stock` DROP COLUMN `ProductId`,
    ADD COLUMN `productId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Type` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Type_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartContent` ADD CONSTRAINT `CartContent_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartContent` ADD CONSTRAINT `CartContent_CartId_fkey` FOREIGN KEY (`CartId`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

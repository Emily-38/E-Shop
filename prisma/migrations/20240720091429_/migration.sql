/*
  Warnings:

  - You are about to drop the column `productId` on the `cartcontent` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `CartContent_CartId_fkey` ON `cartcontent`;

-- DropIndex
DROP INDEX `Product_CategoryId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_typeId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Stock_cartContentId_fkey` ON `stock`;

-- DropIndex
DROP INDEX `Stock_productId_fkey` ON `stock`;

-- AlterTable
ALTER TABLE `cartcontent` DROP COLUMN `productId`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_cartContentId_fkey` FOREIGN KEY (`cartContentId`) REFERENCES `CartContent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartContent` ADD CONSTRAINT `CartContent_CartId_fkey` FOREIGN KEY (`CartId`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

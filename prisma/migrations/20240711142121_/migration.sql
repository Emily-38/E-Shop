/*
  Warnings:

  - You are about to drop the column `CartContentId` on the `product` table. All the data in the column will be lost.
  - Added the required column `productId` to the `CartContent` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `CartContent_CartId_fkey` ON `cartcontent`;

-- DropIndex
DROP INDEX `Product_CartContentId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_CategoryId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Stock_ProductId_fkey` ON `stock`;

-- AlterTable
ALTER TABLE `cartcontent` ADD COLUMN `productId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `CartContentId`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartContent` ADD CONSTRAINT `CartContent_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartContent` ADD CONSTRAINT `CartContent_CartId_fkey` FOREIGN KEY (`CartId`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `CartContent_CartId_fkey` ON `cartcontent`;

-- DropIndex
DROP INDEX `CartContent_productId_fkey` ON `cartcontent`;

-- DropIndex
DROP INDEX `Product_CategoryId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Stock_ProductId_fkey` ON `stock`;

-- CreateIndex
CREATE UNIQUE INDEX `Product_title_key` ON `Product`(`title`);

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

-- DropIndex
DROP INDEX `CartContent_CartId_fkey` ON `cartcontent`;

-- DropIndex
DROP INDEX `Product_CartContentId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_CategoryId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Stock_ProductId_fkey` ON `stock`;

-- AlterTable
ALTER TABLE `user` MODIFY `token` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_CartContentId_fkey` FOREIGN KEY (`CartContentId`) REFERENCES `CartContent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartContent` ADD CONSTRAINT `CartContent_CartId_fkey` FOREIGN KEY (`CartId`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

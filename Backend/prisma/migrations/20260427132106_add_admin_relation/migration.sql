-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "adminId" INTEGER;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id_admin") ON DELETE SET NULL ON UPDATE CASCADE;

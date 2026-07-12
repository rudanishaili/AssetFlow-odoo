import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { seedDepartments } from './seeders/seeders/departments';
import { seedUsers } from './seeders/seeders/users';
import { seedCategories } from './seeders/seeders/categories';
import { seedVendors } from './seeders/seeders/vendors';
import { seedAssets } from './seeders/seeders/assets';
import { seedAssignments } from './seeders/seeders/assignments';
import { seedRequests } from './seeders/seeders/requests';
import { seedBookings } from './seeders/seeders/bookings';
import { seedMaintenance } from './seeders/seeders/maintenance';
import { seedAudits } from './seeders/seeders/audits';
import { seedNotifications } from './seeders/seeders/notifications';
import { seedLogs } from './seeders/seeders/logs';

async function main() {
  console.log("=== Starting Database Seeding ===");

  try {
    // 1. Clean existing database in reverse dependency order
    console.log("Clearing existing data to prevent primary/foreign key conflicts...");
    
    await prisma.auditDiscrepancy.deleteMany();
    await prisma.auditItem.deleteMany();
    await prisma.auditCycle.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.auditLog.deleteMany();
    await prisma.maintenanceRequest.deleteMany();
    await prisma.resourceBooking.deleteMany();
    await prisma.assetRequest.deleteMany();
    await prisma.assetAssignment.deleteMany();
    await prisma.assetImage.deleteMany();
    await prisma.warranty.deleteMany();
    await prisma.purchaseDetails.deleteMany();
    await prisma.asset.deleteMany();
    await prisma.vendor.deleteMany();
    await prisma.category.deleteMany();

    // Break circular relation between User & Department
    await prisma.department.updateMany({ data: { headId: null } });
    await prisma.user.updateMany({ data: { departmentId: null } });
    await prisma.user.deleteMany();
    await prisma.department.deleteMany();
    
    console.log("Database cleared successfully.\n");

    // 2. Seed master data in sequence
    const departments = await seedDepartments(prisma);
    const users = await seedUsers(prisma, departments);
    const categories = await seedCategories(prisma);
    const vendors = await seedVendors(prisma);
    const assets = await seedAssets(prisma, categories, vendors);

    // 3. Seed operational logs and relationships
    await seedAssignments(prisma, assets, users, departments);
    await seedRequests(prisma, assets, users);
    await seedBookings(prisma, assets, users);
    await seedMaintenance(prisma, assets, users);
    await seedAudits(prisma, assets, users);
    await seedNotifications(prisma, users);
    await seedLogs(prisma, users);

    console.log("\n=== Database Seeding Completed Successfully! ===");
  } catch (error) {
    console.error("\n!!! Seeding Failed !!!", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

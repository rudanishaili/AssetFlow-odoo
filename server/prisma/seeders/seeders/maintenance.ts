import { PrismaClient, MaintenancePriority, MaintenanceStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { SeededAsset } from './assets';
import { SeededUser } from './users';

export async function seedMaintenance(
  prisma: PrismaClient,
  assets: SeededAsset[],
  users: SeededUser[]
): Promise<void> {
  console.log("Seeding maintenance requests...");

  const employees = users.filter(u => u.role === 'EMPLOYEE');
  const adminsOrManagers = users.filter(u => u.role === 'ADMIN' || u.role === 'MANAGER');
  
  let maintenanceCount = 0;

  // Let's create about 15 maintenance requests
  for (let i = 0; i < 15; i++) {
    // Pick an asset, prioritizing assets that were created with UNDER_MAINTENANCE status
    const underMaintenanceAssets = assets.filter(a => a.status === 'UNDER_MAINTENANCE');
    const asset = (underMaintenanceAssets.length > 0 && i < underMaintenanceAssets.length)
      ? underMaintenanceAssets[i]
      : assets[faker.number.int({ min: 0, max: assets.length - 1 })];

    const raisedBy = employees[faker.number.int({ min: 0, max: employees.length - 1 })];
    const priority: MaintenancePriority = faker.helpers.arrayElement(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
    
    // If the asset status is UNDER_MAINTENANCE, force status to be IN_PROGRESS or TECHNICIAN_ASSIGNED
    let status: MaintenanceStatus = 'PENDING';
    if (asset.status === 'UNDER_MAINTENANCE') {
      status = faker.helpers.arrayElement(['TECHNICIAN_ASSIGNED', 'IN_PROGRESS']);
    } else {
      status = faker.helpers.arrayElement(['PENDING', 'APPROVED', 'REJECTED', 'RESOLVED']);
    }

    let approvedBy = null;
    let technicianName = null;
    let cost = null;
    let scheduledDate = null;
    let completedDate = null;
    const issueDescription = faker.helpers.arrayElement([
      'Screen flickering and showing artifacts.',
      'Battery draining rapidly, lasting less than 1 hour.',
      'Keys are sticking on the keyboard.',
      'Device fails to power on.',
      'Network connection keeps dropping periodically.',
      'Loud fan noise and overheating under load.'
    ]);
    let notes: string | null = null;

    if (status !== 'PENDING') {
      approvedBy = adminsOrManagers[faker.number.int({ min: 0, max: adminsOrManagers.length - 1 })];
    }

    if (status === 'TECHNICIAN_ASSIGNED' || status === 'IN_PROGRESS' || status === 'RESOLVED') {
      technicianName = faker.helpers.arrayElement(['John Doe (IT Support)', 'Sarah Connor (Hardware Tech)', 'Mike Davis (External Vendor)']);
      scheduledDate = faker.date.past({ years: 0.1 });
    }

    if (status === 'RESOLVED') {
      completedDate = faker.date.between({ from: scheduledDate!, to: new Date() });
      cost = parseFloat(faker.commerce.price({ min: 20, max: 500 }));
      notes = `Resolution details: Replaced faulty hardware components. Device is fully functional.`;
    }

    await prisma.maintenanceRequest.create({
      data: {
        assetId: asset.id,
        raisedById: raisedBy.id,
        priority,
        status,
        issueDescription,
        notes,
        approvedById: approvedBy ? approvedBy.id : null,
        technicianName,
        cost,
        scheduledDate,
        completedDate,
        createdAt: faker.date.past({ years: 0.2 })
      }
    });
    maintenanceCount++;
  }

  console.log(`Successfully seeded ${maintenanceCount} maintenance requests.`);
}

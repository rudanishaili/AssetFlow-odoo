import { PrismaClient, RequestType, RequestStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { SeededAsset } from './assets';
import { SeededUser } from './users';

export async function seedRequests(
  prisma: PrismaClient,
  assets: SeededAsset[],
  users: SeededUser[]
): Promise<void> {
  console.log("Seeding asset requests...");

  const employees = users.filter(u => u.role === 'EMPLOYEE');
  const adminsOrManagers = users.filter(u => u.role === 'ADMIN' || u.role === 'MANAGER');
  
  let requestsCount = 0;

  // Let's create about 25 requests
  for (let i = 0; i < 25; i++) {
    const asset = assets[faker.number.int({ min: 0, max: assets.length - 1 })];
    const requester = employees[faker.number.int({ min: 0, max: employees.length - 1 })];
    
    const requestType: RequestType = faker.helpers.arrayElement(['ALLOCATION', 'TRANSFER']);
    const status: RequestStatus = faker.helpers.arrayElement(['PENDING', 'APPROVED', 'REJECTED']);
    
    let actionedBy = null;
    let targetEmployeeId = null;
    let notes = `Requesting this ${asset.name} for official business use.`;

    if (status !== 'PENDING') {
      actionedBy = adminsOrManagers[faker.number.int({ min: 0, max: adminsOrManagers.length - 1 })];
      notes += `\nAction notes: ${status === 'APPROVED' ? 'Approved based on manager verification.' : 'Denied. Asset inventory is currently limited.'}`;
    }

    if (requestType === 'TRANSFER') {
      // Find another employee as the target of transfer
      const otherEmployee = employees.find(e => e.id !== requester.id) || employees[0];
      targetEmployeeId = otherEmployee.id;
      notes += ` transferring custody to ${otherEmployee.name}`;
    }

    await prisma.assetRequest.create({
      data: {
        assetId: asset.id,
        requesterId: requester.id,
        requestType,
        status,
        notes,
        actionedById: actionedBy ? actionedBy.id : null,
        targetEmployeeId,
        createdAt: faker.date.past({ years: 0.5 })
      }
    });
    requestsCount++;
  }

  console.log(`Successfully seeded ${requestsCount} asset requests.`);
}

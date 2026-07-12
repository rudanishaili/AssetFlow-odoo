import { PrismaClient, AssignmentStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { SeededAsset } from './assets';
import { SeededUser } from './users';
import { SeededDepartment } from './departments';

export async function seedAssignments(
  prisma: PrismaClient,
  assets: SeededAsset[],
  users: SeededUser[],
  departments: SeededDepartment[]
): Promise<void> {
  console.log("Seeding asset assignments...");

  // Filter employees and managers
  const assignableUsers = users.filter(u => u.role === 'EMPLOYEE' || u.role === 'MANAGER');
  
  let assignmentsCount = 0;

  for (let i = 0; i < assets.length; i++) {
    const asset = assets[i];

    // Case 1: If asset is ALLOCATED, it MUST have an active or overdue assignment
    if (asset.status === 'ALLOCATED') {
      const isOverdue = i % 8 === 0;
      const user = assignableUsers[faker.number.int({ min: 0, max: assignableUsers.length - 1 })];
      
      const assignedDate = faker.date.past({ years: 1 });
      const expectedReturnDate = isOverdue 
        ? faker.date.past({ years: 0.1 }) // expected return date is in past
        : faker.date.future({ years: 1 });

      await prisma.assetAssignment.create({
        data: {
          assetId: asset.id,
          employeeId: user.id,
          assignedDate,
          expectedReturnDate,
          status: isOverdue ? 'OVERDUE' : 'ACTIVE'
        }
      });
      assignmentsCount++;
    }

    // Case 2: Create some historical "RETURNED" assignments for AVAILABLE assets
    if (asset.status === 'AVAILABLE' && i % 4 === 0) {
      const user = assignableUsers[faker.number.int({ min: 0, max: assignableUsers.length - 1 })];
      const assignedDate = faker.date.past({ years: 2 });
      const returnedDate = faker.date.past({ years: 0.5 });
      
      await prisma.assetAssignment.create({
        data: {
          assetId: asset.id,
          employeeId: user.id,
          assignedDate,
          expectedReturnDate: returnedDate,
          returnedDate,
          conditionCheckInNotes: 'Asset returned in original operational condition with minor cosmetic scuffs.',
          status: 'RETURNED'
        }
      });
      assignmentsCount++;
    }

    // Case 3: Create some assignments directly to Departments for shared devices (e.g. Printer, Server, Projector)
    if (asset.status === 'AVAILABLE' && i % 10 === 0) {
      const dept = departments[faker.number.int({ min: 0, max: departments.length - 1 })];
      const assignedDate = faker.date.past({ years: 1 });
      
      // Update asset status to ALLOCATED since it is now assigned to a department
      await prisma.asset.update({
        where: { id: asset.id },
        data: { status: 'ALLOCATED' }
      });
      
      await prisma.assetAssignment.create({
        data: {
          assetId: asset.id,
          departmentId: dept.id,
          assignedDate,
          status: 'ACTIVE'
        }
      });
      assignmentsCount++;
    }
  }

  console.log(`Successfully seeded ${assignmentsCount} asset assignments.`);
}

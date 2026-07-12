import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { SeededUser } from './users';

export async function seedLogs(
  prisma: PrismaClient,
  users: SeededUser[]
): Promise<void> {
  console.log("Seeding audit logs...");

  let logsCount = 0;

  // 1. Seed logs for a subset of users
  const targetUsers = users.slice(0, 12);
  
  for (const user of targetUsers) {
    const numLogs = faker.number.int({ min: 3, max: 6 });
    
    for (let j = 0; j < numLogs; j++) {
      const action = faker.helpers.arrayElement([
        'USER_LOGIN',
        'ASSET_REQUEST_CREATE',
        'ASSET_BOOKING_CREATE',
        'PROFILE_UPDATE',
        'PASSWORD_CHANGE',
        'NOTIFICATION_READ'
      ]);

      let details: Record<string, any> = {};
      
      switch (action) {
        case 'USER_LOGIN':
          details = { method: 'OAuth2/AzureAD', device: 'Windows 11 Laptop', browser: 'Chrome' };
          break;
        case 'ASSET_REQUEST_CREATE':
          details = { assetCategory: 'Laptop', urgency: 'High' };
          break;
        case 'ASSET_BOOKING_CREATE':
          details = { bookingId: faker.string.uuid(), durationHours: 2 };
          break;
        case 'PROFILE_UPDATE':
          details = { fieldsChanged: ['phoneNumber', 'jobTitle'] };
          break;
        case 'PASSWORD_CHANGE':
          details = { trigger: 'UserPrompted' };
          break;
        case 'NOTIFICATION_READ':
          details = { count: 1 };
          break;
      }

      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action,
          details,
          ipAddress: faker.internet.ip(),
          createdAt: faker.date.past({ years: 0.15 })
        }
      });
      logsCount++;
    }
  }

  // 2. Add some system-level logs with null userId
  for (let i = 0; i < 5; i++) {
    const systemAction = faker.helpers.arrayElement([
      'DATABASE_CLEANUP',
      'CRON_JOB_RECURRING',
      'EMAIL_DISPATCH_QUEUE',
      'INTEGRATION_SYNC'
    ]);

    await prisma.auditLog.create({
      data: {
        action: systemAction,
        details: { status: 'SUCCESS', executionTimeMs: faker.number.int({ min: 10, max: 1500 }) },
        ipAddress: '127.0.0.1',
        createdAt: faker.date.past({ years: 0.1 })
      }
    });
    logsCount++;
  }

  console.log(`Successfully seeded ${logsCount} audit logs.`);
}

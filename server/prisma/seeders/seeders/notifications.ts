import { PrismaClient, NotificationType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { SeededUser } from './users';

export async function seedNotifications(
  prisma: PrismaClient,
  users: SeededUser[]
): Promise<void> {
  console.log("Seeding notifications...");

  let notificationsCount = 0;

  // Let's seed notifications for a subset of users
  const targetUsers = users.slice(0, 15);

  for (const user of targetUsers) {
    const numNotifications = faker.number.int({ min: 2, max: 5 });

    for (let j = 0; j < numNotifications; j++) {
      const type: NotificationType = faker.helpers.arrayElement([
        'SYSTEM', 'ALLOCATION', 'MAINTENANCE', 'BOOKING', 'TRANSFER', 'AUDIT'
      ]);
      
      let title = 'Notification';
      let message = 'Notification details';
      
      switch (type) {
        case 'SYSTEM':
          title = 'System Maintenance Complete';
          message = 'The AssetFlow platform was successfully updated to version 2.1.0 with security patches.';
          break;
        case 'ALLOCATION':
          title = 'New Asset Assigned to You';
          message = 'A new device has been allocated to you. Please check your asset dashboard and verify delivery.';
          break;
        case 'MAINTENANCE':
          title = 'Maintenance Request Update';
          message = 'The maintenance request for your laptop has been approved. A technician will contact you shortly.';
          break;
        case 'BOOKING':
          title = 'Booking Confirmation';
          message = 'Your reservation for the Conference Room Projector has been confirmed for tomorrow at 2:00 PM.';
          break;
        case 'TRANSFER':
          title = 'Asset Transfer Pending Action';
          message = 'A transfer request has been initiated to move custody of an asset to your department. Action required.';
          break;
        case 'AUDIT':
          title = 'Action Required: Asset Verification';
          message = 'A new audit cycle has started. Please verify the condition of all assets in your possession.';
          break;
      }

      await prisma.notification.create({
        data: {
          userId: user.id,
          title,
          message,
          type,
          isRead: faker.datatype.boolean(),
          createdAt: faker.date.past({ years: 0.1 })
        }
      });
      notificationsCount++;
    }
  }

  console.log(`Successfully seeded ${notificationsCount} notifications.`);
}

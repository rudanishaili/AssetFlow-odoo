import { PrismaClient, BookingStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { SeededAsset } from './assets';
import { SeededUser } from './users';

export async function seedBookings(
  prisma: PrismaClient,
  assets: SeededAsset[],
  users: SeededUser[]
): Promise<void> {
  console.log("Seeding resource bookings...");

  // Find shared bookable assets
  const bookableAssets = await prisma.asset.findMany({
    where: { isSharedBookable: true }
  });

  if (bookableAssets.length === 0) {
    console.log("No shared bookable assets found. Skipping bookings seeding.");
    return;
  }

  const employees = users.filter(u => u.role === 'EMPLOYEE' || u.role === 'MANAGER');
  let bookingsCount = 0;

  // Let's create about 20 bookings
  for (let i = 0; i < 20; i++) {
    const asset = bookableAssets[faker.number.int({ min: 0, max: bookableAssets.length - 1 })];
    const booker = employees[faker.number.int({ min: 0, max: employees.length - 1 })];
    
    const status: BookingStatus = faker.helpers.arrayElement(['UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED']);
    
    let startTime: Date;
    let endTime: Date;

    const now = new Date();

    if (status === 'COMPLETED') {
      startTime = faker.date.past();
      endTime = new Date(startTime.getTime() + faker.number.int({ min: 1, max: 4 }) * 60 * 60 * 1000); // 1-4 hours later
    } else if (status === 'ONGOING') {
      startTime = new Date(now.getTime() - 1 * 60 * 60 * 1000); // 1 hour ago
      endTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);  // 2 hours later
    } else if (status === 'UPCOMING') {
      startTime = faker.date.future();
      endTime = new Date(startTime.getTime() + faker.number.int({ min: 1, max: 4 }) * 60 * 60 * 1000);
    } else { // CANCELLED
      startTime = faker.date.future();
      endTime = new Date(startTime.getTime() + faker.number.int({ min: 1, max: 4 }) * 60 * 60 * 1000);
    }

    await prisma.resourceBooking.create({
      data: {
        assetId: asset.id,
        bookerId: booker.id,
        startTime,
        endTime,
        status,
        createdAt: faker.date.past({ years: 0.2 })
      }
    });
    bookingsCount++;
  }

  console.log(`Successfully seeded ${bookingsCount} resource bookings.`);
}

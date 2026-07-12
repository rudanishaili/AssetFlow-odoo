import { PrismaClient } from '@prisma/client';

export interface SeededVendor {
  id: string;
  name: string;
}

export async function seedVendors(prisma: PrismaClient): Promise<SeededVendor[]> {
  console.log("Seeding vendors...");
  
  const vendorsData = [
    { name: 'Dell', email: 'sales@dell.com', phone: '+1-800-456-3355', address: 'Round Rock, Texas, USA' },
    { name: 'HP', email: 'support@hp.com', phone: '+1-800-474-6836', address: 'Palo Alto, California, USA' },
    { name: 'Lenovo', email: 'corporate@lenovo.com', phone: '+1-855-253-6686', address: 'Morrisville, North Carolina, USA' },
    { name: 'Apple', email: 'enterprise@apple.com', phone: '+1-800-692-7753', address: 'Cupertino, California, USA' },
    { name: 'Asus', email: 'info@asus.com', phone: '+886-2-8967-3333', address: 'Beitou District, Taipei, Taiwan' },
    { name: 'Acer', email: 'contact@acer.com', phone: '+886-2-2696-1234', address: 'New Taipei City, Taiwan' },
    { name: 'Logitech', email: 'sales@logitech.com', phone: '+1-510-792-0400', address: 'Newark, California, USA' },
    { name: 'Samsung', email: 'b2b.support@samsung.com', phone: '+1-800-726-7864', address: 'Suwon, South Korea' }
  ];
  
  const seededVendors: SeededVendor[] = [];
  
  for (const vendor of vendorsData) {
    // Find if vendor already exists by name
    let dbVendor = await prisma.vendor.findFirst({ where: { name: vendor.name } });
    if (!dbVendor) {
      dbVendor = await prisma.vendor.create({
        data: vendor
      });
    }
    seededVendors.push({ id: dbVendor.id, name: dbVendor.name });
  }
  
  console.log(`Successfully seeded ${seededVendors.length} vendors.`);
  return seededVendors;
}

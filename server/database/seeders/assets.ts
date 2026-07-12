import { PrismaClient, AssetCondition, AssetStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { SeededCategory } from './categories';
import { SeededVendor } from './vendors';

export interface SeededAsset {
  id: string;
  name: string;
  assetTag: string;
  status: AssetStatus;
  categoryId: string;
}

export async function seedAssets(
  prisma: PrismaClient,
  categories: SeededCategory[],
  vendors: SeededVendor[]
): Promise<SeededAsset[]> {
  console.log("Seeding assets, warranties, purchase details, and images...");

  const seededAssets: SeededAsset[] = [];
  const totalAssetsCount = 75;

  const locations = ['Main Office - Floor 1', 'Main Office - Floor 2', 'Chicago HQ', 'Remote', 'London Branch', 'Data Center A'];

  for (let i = 1; i <= totalAssetsCount; i++) {
    // Select category & vendor randomly, but make them logical where possible
    const category = categories[faker.number.int({ min: 0, max: categories.length - 1 })];
    const vendor = vendors[faker.number.int({ min: 0, max: vendors.length - 1 })];

    // Generate logical name based on category and vendor
    let assetName = `${vendor.name} ${category.name}`;
    let customValues: Record<string, any> = {};

    switch (category.name) {
      case 'Laptop':
        const laptopModels = ['XPS 13', 'Latitude 5420', 'ThinkPad X1 Carbon', 'MacBook Pro 16', 'EliteBook 840', 'ZenBook Pro'];
        assetName = `${vendor.name} ${faker.helpers.arrayElement(laptopModels)}`;
        customValues = {
          'RAM (GB)': faker.helpers.arrayElement([8, 16, 32, 64]),
          'Storage (GB)': faker.helpers.arrayElement([256, 512, 1024, 2048]),
          'Processor': faker.helpers.arrayElement(['Intel Core i7', 'Intel Core i9', 'Apple M3 Pro', 'Apple M3 Max', 'AMD Ryzen 7'])
        };
        break;
      case 'Desktop':
        const desktopModels = ['OptiPlex 7090', 'ThinkCentre M70q', 'iMac 24', 'ProDesk 600'];
        assetName = `${vendor.name} ${faker.helpers.arrayElement(desktopModels)}`;
        customValues = {
          'RAM (GB)': faker.helpers.arrayElement([8, 16, 32]),
          'Storage (GB)': faker.helpers.arrayElement([512, 1024]),
          'GPU Model': faker.helpers.arrayElement(['Intel UHD Graphics', 'NVIDIA RTX 3060', 'Apple M3 Integrated', 'NVIDIA RTX 4070'])
        };
        break;
      case 'Monitor':
        const monitorSizes = [24, 27, 32, 34];
        assetName = `${vendor.name} ${faker.helpers.arrayElement(monitorSizes)}-inch Monitor`;
        customValues = {
          'Screen Size (inches)': faker.helpers.arrayElement(monitorSizes),
          'Resolution': faker.helpers.arrayElement(['1920x1080', '2560x1440', '3840x2160'])
        };
        break;
      case 'Keyboard':
        assetName = `${vendor.name} Mechanical Keyboard`;
        customValues = { 'Type': faker.helpers.arrayElement(['Mechanical', 'Membrane', 'Ergonomic']) };
        break;
      case 'Mouse':
        assetName = `${vendor.name} Wireless Mouse`;
        customValues = { 'Connection': faker.helpers.arrayElement(['Wired', 'Wireless (USB)', 'Bluetooth']) };
        break;
      case 'Printer':
        assetName = `${vendor.name} Office Printer`;
        customValues = {
          'Type': faker.helpers.arrayElement(['LaserJet Multi-Function', 'InkJet Color Printer']),
          'Color Supported': faker.datatype.boolean()
        };
        break;
      case 'Mobile':
        const phoneModels = ['iPhone 15 Pro', 'Galaxy S24 Ultra', 'iPhone 14', 'Galaxy A54'];
        assetName = `${vendor.name} ${faker.helpers.arrayElement(phoneModels)}`;
        customValues = {
          'OS': assetName.includes('iPhone') ? 'iOS' : 'Android',
          'Storage (GB)': faker.helpers.arrayElement([128, 256, 512])
        };
        break;
      case 'Projector':
        assetName = `${vendor.name} HD Projector`;
        customValues = { 'Max Brightness (Lumens)': faker.helpers.arrayElement([3000, 4500, 6000]) };
        break;
      case 'Server':
        const serverModels = ['PowerEdge R750', 'ThinkSystem SR650', 'ProLiant DL380'];
        assetName = `${vendor.name} ${faker.helpers.arrayElement(serverModels)}`;
        customValues = {
          'CPU Cores': faker.helpers.arrayElement([16, 32, 64, 128]),
          'RAM (GB)': faker.helpers.arrayElement([64, 128, 256, 512]),
          'Form Factor': faker.helpers.arrayElement(['Rackmount (2U)', 'Rackmount (1U)', 'Tower'])
        };
        break;
      case 'Network Device':
        const netModels = ['24-Port Switch', 'Gigabit Router', 'UniFi Access Point'];
        assetName = `${vendor.name} ${faker.helpers.arrayElement(netModels)}`;
        customValues = {
          'Ports Count': faker.helpers.arrayElement([8, 16, 24, 48]),
          'IP Address': `192.168.1.${faker.number.int({ min: 10, max: 250 })}`
        };
        break;
    }

    const assetTag = `AF-${String(i).padStart(4, '0')}`;
    const serialNumber = `SN-${faker.string.alphanumeric(10).toUpperCase()}`;
    const acquisitionDate = faker.date.past({ years: 3 });
    const acquisitionCost = parseFloat(faker.commerce.price({ min: 50, max: 5000 }));
    
    // Choose status based on index for variety
    let status: AssetStatus = 'AVAILABLE';
    if (i % 5 === 0) status = 'ALLOCATED';
    else if (i % 12 === 0) status = 'RESERVED';
    else if (i % 17 === 0) status = 'UNDER_MAINTENANCE';
    else if (i % 25 === 0) status = 'LOST';
    else if (i % 30 === 0) status = 'RETIRED';

    // Condition based on status and index
    let condition: AssetCondition = 'GOOD';
    if (status === 'RETIRED') condition = 'POOR';
    else if (i % 7 === 0) condition = 'NEW';
    else if (i % 9 === 0) condition = 'FAIR';
    
    const location = faker.helpers.arrayElement(locations);
    const isSharedBookable = category.name === 'Projector' || category.name === 'Monitor' || category.name === 'Printer';

    // Check if asset already exists
    let dbAsset = await prisma.asset.findUnique({ where: { assetTag } });
    if (!dbAsset) {
      dbAsset = await prisma.asset.create({
        data: {
          name: assetName,
          assetTag,
          serialNumber,
          acquisitionDate,
          acquisitionCost,
          condition,
          location,
          isSharedBookable,
          status,
          customFieldValues: customValues,
          categoryId: category.id,
          vendorId: vendor.id,
          
          // Nested creation of 1-to-1 Warranty
          warranty: {
            create: {
              provider: `${vendor.name} Support Services`,
              startDate: acquisitionDate,
              endDate: faker.date.future({ years: 3, refDate: acquisitionDate }),
              contactInfo: `${vendor.name} Hotline: 1-800-${vendor.name.toUpperCase()}`,
              terms: 'Standard manufacturer warranty covering parts and labor under normal operational use.'
            }
          },

          // Nested creation of 1-to-1 Purchase Details
          purchaseDetails: {
            create: {
              invoiceNumber: `INV-${faker.date.past().getFullYear()}-${faker.number.int({ min: 10000, max: 99999 })}`,
              purchaseOrderNumber: `PO-${faker.number.int({ min: 10000, max: 99999 })}`,
              purchaseDate: faker.date.past({ years: 1, refDate: acquisitionDate }),
              cost: acquisitionCost
            }
          },

          // Nested creation of AssetImage
          images: {
            create: [
              { url: `https://picsum.photos/seed/asset-${i}-1/600/400` },
              { url: `https://picsum.photos/seed/asset-${i}-2/600/400` }
            ]
          }
        }
      });
    }

    seededAssets.push({
      id: dbAsset.id,
      name: dbAsset.name,
      assetTag: dbAsset.assetTag,
      status: dbAsset.status,
      categoryId: dbAsset.categoryId
    });
  }

  console.log(`Successfully seeded ${seededAssets.length} assets (with warranties, purchase details, and images).`);
  return seededAssets;
}

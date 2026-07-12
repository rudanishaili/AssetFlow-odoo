import { PrismaClient } from '@prisma/client';

export interface SeededCategory {
  id: string;
  name: string;
}

export async function seedCategories(prisma: PrismaClient): Promise<SeededCategory[]> {
  console.log("Seeding categories...");
  
  const categoriesData = [
    {
      name: 'Laptop',
      description: 'Portable workstation computers',
      customFieldSpecs: [
        { name: 'RAM (GB)', type: 'number' },
        { name: 'Storage (GB)', type: 'number' },
        { name: 'Processor', type: 'string' }
      ]
    },
    {
      name: 'Desktop',
      description: 'Stationary office computers',
      customFieldSpecs: [
        { name: 'RAM (GB)', type: 'number' },
        { name: 'Storage (GB)', type: 'number' },
        { name: 'GPU Model', type: 'string' }
      ]
    },
    {
      name: 'Monitor',
      description: 'Display screens',
      customFieldSpecs: [
        { name: 'Screen Size (inches)', type: 'number' },
        { name: 'Resolution', type: 'string' }
      ]
    },
    {
      name: 'Keyboard',
      description: 'Input keyboard devices',
      customFieldSpecs: [
        { name: 'Type', type: 'string' } // Mechanical, Membrane
      ]
    },
    {
      name: 'Mouse',
      description: 'Input pointing devices',
      customFieldSpecs: [
        { name: 'Connection', type: 'string' } // Wireless, Wired
      ]
    },
    {
      name: 'Printer',
      description: 'Office printing & scanning devices',
      customFieldSpecs: [
        { name: 'Type', type: 'string' }, // Laser, Inkjet
        { name: 'Color Supported', type: 'boolean' }
      ]
    },
    {
      name: 'Mobile',
      description: 'Company smartphones',
      customFieldSpecs: [
        { name: 'OS', type: 'string' }, // iOS, Android
        { name: 'Storage (GB)', type: 'number' }
      ]
    },
    {
      name: 'Projector',
      description: 'Meeting room projectors',
      customFieldSpecs: [
        { name: 'Max Brightness (Lumens)', type: 'number' }
      ]
    },
    {
      name: 'Server',
      description: 'Data center servers',
      customFieldSpecs: [
        { name: 'CPU Cores', type: 'number' },
        { name: 'RAM (GB)', type: 'number' },
        { name: 'Form Factor', type: 'string' } // Rackmount, Tower
      ]
    },
    {
      name: 'Network Device',
      description: 'Switches, routers, and access points',
      customFieldSpecs: [
        { name: 'Ports Count', type: 'number' },
        { name: 'IP Address', type: 'string' }
      ]
    }
  ];
  
  const seededCategories: SeededCategory[] = [];
  
  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: {
        name: cat.name,
        description: cat.description,
        customFieldSpecs: cat.customFieldSpecs
      }
    });
    seededCategories.push({ id: created.id, name: created.name });
  }
  
  console.log(`Successfully seeded ${seededCategories.length} categories.`);
  return seededCategories;
}

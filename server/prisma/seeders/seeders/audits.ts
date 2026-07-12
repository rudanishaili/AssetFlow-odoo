import { PrismaClient, AuditCycleStatus, AuditItemStatus, DiscrepancyStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { SeededAsset } from './assets';
import { SeededUser } from './users';

export async function seedAudits(
  prisma: PrismaClient,
  assets: SeededAsset[],
  users: SeededUser[]
): Promise<void> {
  console.log("Seeding audits (cycles, items, and discrepancies)...");

  const auditors = users.filter(u => u.role === 'ADMIN' || u.role === 'MANAGER');
  
  const now = new Date();

  // 1. Create a Completed Audit Cycle
  const completedCycle = await prisma.auditCycle.create({
    data: {
      name: 'Q4 2025 General Asset Audit',
      scopeLocation: 'Main Office - Floor 1',
      startDate: new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000), // 6 months ago
      endDate: new Date(now.getTime() - 150 * 24 * 60 * 60 * 1000),   // 5 months ago
      status: 'COMPLETED'
    }
  });

  // 2. Create an Active Audit Cycle
  const activeCycle = await prisma.auditCycle.create({
    data: {
      name: 'Q2 2026 London HQ Audit',
      scopeLocation: 'London Branch',
      startDate: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
      endDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),  // 2 weeks from now
      status: 'ACTIVE'
    }
  });

  // 3. Create a Planned Audit Cycle
  const plannedCycle = await prisma.auditCycle.create({
    data: {
      name: 'Q3 2026 IT Inventory Audit',
      scopeLocation: 'Remote',
      startDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 1 month from now
      endDate: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),  // 2 months from now
      status: 'PLANNED'
    }
  });

  // ----------------------------------------------------
  // Seed Audit Items & Discrepancies for Completed Cycle
  // ----------------------------------------------------
  // Audit 10 random assets
  for (let i = 0; i < 10; i++) {
    const asset = assets[i % assets.length];
    const auditor = auditors[faker.number.int({ min: 0, max: auditors.length - 1 })];
    
    // Most verified, some missing/damaged
    const status: AuditItemStatus = i % 4 === 0 
      ? 'DAMAGED' 
      : (i % 7 === 0 ? 'MISSING' : 'VERIFIED');
    
    const verificationNotes = status === 'VERIFIED'
      ? 'Asset verified in location, matching serial number.'
      : `Flagged during audit: Asset is ${status.toLowerCase()}.`;

    const item = await prisma.auditItem.create({
      data: {
        auditCycleId: completedCycle.id,
        assetId: asset.id,
        auditorId: auditor.id,
        status,
        verificationNotes
      }
    });

    // Create discrepancies for DAMAGED/MISSING items
    if (status === 'DAMAGED' || status === 'MISSING') {
      const isResolved = i % 2 === 0;
      
      const discrepancy = await prisma.auditDiscrepancy.create({
        data: {
          auditItemId: item.id,
          description: `Asset ${asset.assetTag} was reported as ${status.toLowerCase()} during cycle ${completedCycle.name}.`,
          status: isResolved ? 'RESOLVED' : 'OPEN',
          resolutionNotes: isResolved 
            ? 'Replacement asset allocated. Damaged asset sent for e-waste recycling.' 
            : null,
          resolvedById: isResolved ? auditors[0].id : null
        }
      });
    }
  }

  // ----------------------------------------------------
  // Seed Audit Items & Discrepancies for Active Cycle
  // ----------------------------------------------------
  // Audit another 10 assets (some pending, some audited)
  for (let i = 10; i < 20; i++) {
    const asset = assets[i % assets.length];
    const auditor = auditors[faker.number.int({ min: 0, max: auditors.length - 1 })];
    
    const status: AuditItemStatus = i % 3 === 0 
      ? 'PENDING' 
      : (i % 5 === 0 ? 'MISSING' : 'VERIFIED');
    
    const verificationNotes = status === 'VERIFIED'
      ? 'Verified.'
      : (status === 'PENDING' ? '' : 'Asset not found at designated workspace.');

    const item = await prisma.auditItem.create({
      data: {
        auditCycleId: activeCycle.id,
        assetId: asset.id,
        auditorId: auditor.id,
        status,
        verificationNotes
      }
    });

    if (status === 'MISSING') {
      // Discrepancy remains OPEN because cycle is still active
      await prisma.auditDiscrepancy.create({
        data: {
          auditItemId: item.id,
          description: `Asset is unaccounted for during active audit cycle: ${activeCycle.name}.`,
          status: 'OPEN'
        }
      });
    }
  }

  // ----------------------------------------------------
  // Seed Audit Items for Planned Cycle
  // ----------------------------------------------------
  // All items should be PENDING
  for (let i = 20; i < 25; i++) {
    const asset = assets[i % assets.length];
    const auditor = auditors[faker.number.int({ min: 0, max: auditors.length - 1 })];

    await prisma.auditItem.create({
      data: {
        auditCycleId: plannedCycle.id,
        assetId: asset.id,
        auditorId: auditor.id,
        status: 'PENDING',
        verificationNotes: 'Pending audit start.'
      }
    });
  }

  console.log("Successfully seeded audit cycles, items, and discrepancies.");
}

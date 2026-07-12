import prisma from '../../src/config/db.js';
import { ApiError } from '../../common/errors/ApiError.js';

export const registerAsset = async (data) => {
  // Count total assets to generate sequential tag AF-XXXX
  const count = await prisma.asset.count();
  const assetTag = 'AF-' + String(count + 1).padStart(4, '0');
  
  const asset = await prisma.asset.create({
    data: {
      name: data.name,
      assetTag,
      serialNumber: data.serialNumber,
      acquisitionDate: new Date(data.acquisitionDate),
      acquisitionCost: parseFloat(data.acquisitionCost),
      condition: data.condition || 'NEW',
      location: data.location,
      isSharedBookable: data.isSharedBookable || false,
      status: 'AVAILABLE',
      categoryId: data.categoryId,
      vendorId: data.vendorId,
      customFieldValues: data.customFieldValues
    }
  });
  
  // Add warranty details if provided
  if (data.warranty) {
    await prisma.warranty.create({
      data: {
        provider: data.warranty.provider,
        startDate: new Date(data.warranty.startDate),
        endDate: new Date(data.warranty.endDate),
        contactInfo: data.warranty.contactInfo,
        terms: data.warranty.terms,
        assetId: asset.id
      }
    });
  }

  // Add purchase details
  if (data.purchaseDetails) {
    await prisma.purchaseDetails.create({
      data: {
        invoiceNumber: data.purchaseDetails.invoiceNumber,
        purchaseOrderNumber: data.purchaseDetails.purchaseOrderNumber,
        purchaseDate: new Date(data.purchaseDetails.purchaseDate),
        cost: parseFloat(data.purchaseDetails.cost),
        assetId: asset.id
      }
    });
  }
  
  return asset;
};

export const getAssets = async (filters) => {
  const where = {};
  if (filters.category) where.categoryId = filters.category;
  if (filters.status) where.status = filters.status;
  if (filters.location) where.location = { contains: filters.location };
  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search } },
      { assetTag: { contains: filters.search } },
      { serialNumber: { contains: filters.search } }
    ];
  }
  
  return prisma.asset.findMany({
    where,
    include: { category: true, warranty: true, purchaseDetails: true, images: true }
  });
};

export const getAssetHistory = async (assetId) => {
  const assignments = await prisma.assetAssignment.findMany({
    where: { assetId },
    include: { employee: true, department: true },
    orderBy: { assignedDate: 'desc' }
  });
  
  const maintenance = await prisma.maintenanceRequest.findMany({
    where: { assetId },
    orderBy: { createdAt: 'desc' }
  });

  return { assignments, maintenance };
};
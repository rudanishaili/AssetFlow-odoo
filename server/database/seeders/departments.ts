import { PrismaClient } from '@prisma/client';

export interface SeededDepartment {
  id: string;
  name: string;
}

export async function seedDepartments(prisma: PrismaClient): Promise<SeededDepartment[]> {
  console.log("Seeding departments...");
  
  // Define departments
  const departmentNames = ['HR', 'IT', 'Finance', 'Sales', 'Marketing', 'Operations'];
  
  const seededDepartments: SeededDepartment[] = [];
  
  // Create parent departments
  for (const name of departmentNames) {
    const dept = await prisma.department.upsert({
      where: { name },
      update: {},
      create: {
        name,
        status: 'ACTIVE'
      }
    });
    seededDepartments.push({ id: dept.id, name: dept.name });
  }
  
  // Create a sub-department for realism (e.g. IT Support under IT)
  const itDept = seededDepartments.find(d => d.name === 'IT');
  if (itDept) {
    const subDeptName = 'IT Support';
    const subDept = await prisma.department.upsert({
      where: { name: subDeptName },
      update: {},
      create: {
        name: subDeptName,
        parentId: itDept.id,
        status: 'ACTIVE'
      }
    });
    seededDepartments.push({ id: subDept.id, name: subDept.name });
  }
  
  console.log(`Successfully seeded ${seededDepartments.length} departments.`);
  return seededDepartments;
}

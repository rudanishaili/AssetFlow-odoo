import { PrismaClient, Role, UserStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';
import { SeededDepartment } from './departments';

export interface SeededUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  departmentId: string | null;
}

export async function seedUsers(
  prisma: PrismaClient, 
  departments: SeededDepartment[]
): Promise<SeededUser[]> {
  console.log("Seeding users...");
  
  const seededUsers: SeededUser[] = [];
  const passwordHash = bcrypt.hashSync('Password123', 10);
  
  // 1. Seed 1 Super Admin
  const adminEmail = 'admin@assetflow.com';
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: 'Super Admin',
      email: adminEmail,
      password: passwordHash,
      role: 'ADMIN',
      status: 'ACTIVE'
    }
  });
  seededUsers.push({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    departmentId: admin.departmentId
  });

  // 2. Seed 3 Managers
  const managersData = [
    { name: 'Alice Smith', email: 'alice.smith@assetflow.com', deptName: 'IT' },
    { name: 'Bob Jones', email: 'bob.jones@assetflow.com', deptName: 'HR' },
    { name: 'Charlie Brown', email: 'charlie.brown@assetflow.com', deptName: 'Finance' }
  ];
  
  const managers: typeof admin[] = [];
  for (const mgrData of managersData) {
    const dept = departments.find(d => d.name === mgrData.deptName);
    const mgr = await prisma.user.upsert({
      where: { email: mgrData.email },
      update: {},
      create: {
        name: mgrData.name,
        email: mgrData.email,
        password: passwordHash,
        role: 'MANAGER',
        status: 'ACTIVE',
        departmentId: dept ? dept.id : null
      }
    });
    
    // Assign manager as head of their respective department
    if (dept) {
      await prisma.department.update({
        where: { id: dept.id },
        data: { headId: mgr.id }
      });
    }
    
    managers.push(mgr);
    seededUsers.push({
      id: mgr.id,
      name: mgr.name,
      email: mgr.email,
      role: mgr.role,
      departmentId: mgr.departmentId
    });
  }

  // 3. Seed 20 Employees
  // Filter out 'IT Support' sub-department, or assign employees to both parent and sub-departments
  for (let i = 0; i < 20; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();
    
    // Assign a random department
    const randomDept = departments[faker.number.int({ min: 0, max: departments.length - 1 })];
    
    // Check if user already exists
    let emp = await prisma.user.findUnique({ where: { email } });
    if (!emp) {
      emp = await prisma.user.create({
        data: {
          name: fullName,
          email,
          password: passwordHash,
          role: 'EMPLOYEE',
          status: 'ACTIVE',
          departmentId: randomDept.id
        }
      });
    }
    
    seededUsers.push({
      id: emp.id,
      name: emp.name,
      email: emp.email,
      role: emp.role,
      departmentId: emp.departmentId
    });
  }
  
  console.log(`Successfully seeded ${seededUsers.length} users.`);
  return seededUsers;
}

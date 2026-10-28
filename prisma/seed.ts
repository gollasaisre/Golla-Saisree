import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding demo data...');

  // 1. Create Skills
  const java = await prisma.skill.upsert({
    where: { name: 'Java' },
    update: {},
    create: { name: 'Java', category: 'Programming' },
  });
  const python = await prisma.skill.upsert({
    where: { name: 'Python' },
    update: {},
    create: { name: 'Python', category: 'Programming' },
  });
  const sql = await prisma.skill.upsert({
    where: { name: 'SQL' },
    update: {},
    create: { name: 'SQL', category: 'Database' },
  });
  const git = await prisma.skill.upsert({
    where: { name: 'Git' },
    update: {},
    create: { name: 'Git', category: 'Tools' },
  });
  const springBoot = await prisma.skill.upsert({
    where: { name: 'Spring Boot' },
    update: {},
    create: { name: 'Spring Boot', category: 'Backend' },
  });
  const restApi = await prisma.skill.upsert({
    where: { name: 'REST API' },
    update: {},
    create: { name: 'REST API', category: 'Backend' },
  });

  // 2. Create Career
  const career = await prisma.career.upsert({
    where: { title: 'Java Backend Developer' },
    update: {},
    create: {
      title: 'Java Backend Developer',
      description: 'Build robust, scalable server-side applications and APIs using Java and Spring Boot.',
      matchScore: 87,
    },
  });

  // 3. Create User (Alex)
  const passwordHash = await bcrypt.hash('password123', 10);
  await prisma.user.upsert({
    where: { email: 'alex@demo.com' },
    update: { password: passwordHash },
    create: {
      name: 'Alex',
      email: 'alex@demo.com',
      password: passwordHash,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      profile: {
        create: {
          headline: 'Aspiring Java Backend Developer',
          bio: 'Recent CS graduate looking to build scalable backend systems.',
          location: 'San Francisco, CA',
          targetRole: career.title,
          careerReadiness: 68,
        },
      },
      userSkills: {
        create: [
          { skillId: java.id, proficiency: 'Intermediate' },
          { skillId: python.id, proficiency: 'Beginner' },
          { skillId: sql.id, proficiency: 'Intermediate' },
          { skillId: git.id, proficiency: 'Intermediate' },
          { skillId: springBoot.id, proficiency: 'Beginner' },
          { skillId: restApi.id, proficiency: 'Beginner' },
        ],
      },
    },
  });

  console.log('Demo data seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

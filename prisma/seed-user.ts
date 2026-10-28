import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'test@example.com';
  const password = await bcrypt.hash('password123', 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { password },
    create: {
      email,
      name: 'Test User',
      password,
      profile: {
        create: {
          headline: 'Software Engineer',
          bio: 'Passionate about building great software.',
          location: 'San Francisco, CA',
          targetRole: 'Senior Developer',
          careerReadiness: 85,
        }
      }
    }
  });

  console.log(`Test user created: ${user.email} / password123`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

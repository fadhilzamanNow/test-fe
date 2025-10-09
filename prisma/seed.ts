import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: adminPassword,
      role: 'Admin',
    },
  });
  console.log('✅ Admin user created:', admin.username);

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { username: 'user' },
    update: {},
    create: {
      username: 'user',
      password: userPassword,
      role: 'User',
    },
  });
  console.log('✅ Regular user created:', user.username);

  // Create categories
  const categories = [
    { name: 'Technology', userId: admin.id },
    { name: 'Programming', userId: admin.id },
    { name: 'Web Development', userId: admin.id },
    { name: 'Mobile Development', userId: admin.id },
    { name: 'DevOps', userId: admin.id },
  ];

  const createdCategories = [];
  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { id: 'temp-id-' + category.name },
      update: {},
      create: category,
    });
    createdCategories.push(created);
    console.log('✅ Category created:', created.name);
  }

  // Create sample articles
  const articles = [
    {
      title: 'Introduction to Next.js 15',
      content: `
        <h2>What is Next.js?</h2>
        <p>Next.js is a powerful React framework that enables you to build full-stack web applications with ease. Version 15 brings exciting new features and improvements.</p>
        <h3>Key Features:</h3>
        <ul>
          <li>Server Components by default</li>
          <li>Improved performance</li>
          <li>Better developer experience</li>
          <li>Enhanced routing with App Router</li>
        </ul>
        <p>This makes Next.js an excellent choice for building modern web applications.</p>
      `,
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      userId: admin.id,
      categoryId: createdCategories[0].id,
    },
    {
      title: 'Getting Started with TypeScript',
      content: `
        <h2>Why TypeScript?</h2>
        <p>TypeScript adds static typing to JavaScript, making your code more robust and maintainable. It catches errors at compile-time rather than runtime.</p>
        <h3>Benefits:</h3>
        <ul>
          <li>Type safety</li>
          <li>Better IDE support</li>
          <li>Improved code documentation</li>
          <li>Easier refactoring</li>
        </ul>
        <p>Start using TypeScript today and see the difference!</p>
      `,
      imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
      userId: admin.id,
      categoryId: createdCategories[1].id,
    },
    {
      title: 'Building RESTful APIs with Node.js',
      content: `
        <h2>REST API Design Principles</h2>
        <p>Creating a well-designed RESTful API is crucial for modern web applications. Here are some best practices to follow.</p>
        <h3>Best Practices:</h3>
        <ul>
          <li>Use proper HTTP methods</li>
          <li>Implement versioning</li>
          <li>Provide meaningful error messages</li>
          <li>Secure your endpoints</li>
        </ul>
        <p>Follow these principles to build scalable APIs.</p>
      `,
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
      userId: admin.id,
      categoryId: createdCategories[2].id,
    },
    {
      title: 'React Hooks: A Complete Guide',
      content: `
        <h2>Understanding React Hooks</h2>
        <p>React Hooks revolutionized how we write React components. They allow you to use state and other React features without writing a class.</p>
        <h3>Common Hooks:</h3>
        <ul>
          <li>useState - for state management</li>
          <li>useEffect - for side effects</li>
          <li>useContext - for context API</li>
          <li>useMemo - for memoization</li>
        </ul>
        <p>Master these hooks to become a proficient React developer.</p>
      `,
      imageUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800',
      userId: admin.id,
      categoryId: createdCategories[2].id,
    },
    {
      title: 'Prisma: Modern Database ORM',
      content: `
        <h2>What is Prisma?</h2>
        <p>Prisma is a next-generation ORM that makes working with databases incredibly easy and type-safe.</p>
        <h3>Features:</h3>
        <ul>
          <li>Type-safe database queries</li>
          <li>Auto-generated queries</li>
          <li>Migration system</li>
          <li>Excellent TypeScript support</li>
        </ul>
        <p>Prisma simplifies database operations while maintaining type safety.</p>
      `,
      imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
      userId: admin.id,
      categoryId: createdCategories[1].id,
    },
    {
      title: 'Mobile App Development with React Native',
      content: `
        <h2>Cross-Platform Development</h2>
        <p>React Native allows you to build mobile applications for both iOS and Android using JavaScript and React.</p>
        <h3>Advantages:</h3>
        <ul>
          <li>Code reusability</li>
          <li>Hot reloading</li>
          <li>Large community</li>
          <li>Native performance</li>
        </ul>
        <p>Build beautiful mobile apps with React Native.</p>
      `,
      imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
      userId: admin.id,
      categoryId: createdCategories[3].id,
    },
    {
      title: 'Docker and Containerization Basics',
      content: `
        <h2>Introduction to Docker</h2>
        <p>Docker has transformed how we deploy and manage applications. Learn the fundamentals of containerization.</p>
        <h3>Core Concepts:</h3>
        <ul>
          <li>Images and Containers</li>
          <li>Dockerfile</li>
          <li>Docker Compose</li>
          <li>Container orchestration</li>
        </ul>
        <p>Containerize your applications for consistent deployments.</p>
      `,
      imageUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800',
      userId: admin.id,
      categoryId: createdCategories[4].id,
    },
    {
      title: 'JWT Authentication Explained',
      content: `
        <h2>Secure Your Applications</h2>
        <p>JSON Web Tokens (JWT) provide a secure way to authenticate users in modern web applications.</p>
        <h3>How JWT Works:</h3>
        <ul>
          <li>User logs in with credentials</li>
          <li>Server generates JWT token</li>
          <li>Client stores token</li>
          <li>Token sent with each request</li>
        </ul>
        <p>Implement JWT for secure, stateless authentication.</p>
      `,
      imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800',
      userId: admin.id,
      categoryId: createdCategories[0].id,
    },
  ];

  for (const article of articles) {
    const created = await prisma.article.create({
      data: article,
    });
    console.log('✅ Article created:', created.title);
  }

  console.log('🎉 Database seed completed successfully!');
  console.log('\n📝 Login credentials:');
  console.log('Admin - username: admin, password: admin123');
  console.log('User  - username: user, password: user123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

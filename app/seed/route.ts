import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { properties, users } from '../lib/placeholder-data';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );
  return insertedUsers;
}

async function seedProperties() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS estate_properties (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        price INTEGER NOT NULL,
        location VARCHAR(255) NOT NULL,
        beds INTEGER NOT NULL,
        baths DECIMAL(3,1) NOT NULL,
        area INTEGER NOT NULL,
        images TEXT[] NOT NULL,
        status VARCHAR(20) CHECK (status IN ('available', 'sold', 'pending')),
        is_favourite BOOLEAN DEFAULT false
      );
  `;

  // Insert properties
  for (const property of properties) {
    // Convert JavaScript array to PostgreSQL array format
    const imagesArray = `{${property.images.join(',')}}`;

    await client.sql`
        INSERT INTO estate_properties (
          id, 
          title, 
          price, 
          location, 
          beds,
          baths,
          area,
          images,
          status,
          is_favourite
        )
        VALUES (
          ${property.id},
          ${property.title},
          ${property.price},
          ${property.location},
          ${property.beds},
          ${property.baths},
          ${property.area},
          ${imagesArray}::text[],
          ${property.status},
          ${property.is_favourite}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
  }
}


export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedProperties();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}

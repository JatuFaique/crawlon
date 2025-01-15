import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { Property } from './placeholder-data';




const ITEMS_PER_PAGE = 6;




export async function fetchProperties() {
  try {
    const data = await sql<Property>` 
      SELECT
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
      FROM estate_properties
      ORDER BY title ASC
    `;

    const properties = data.rows; // Retrieve rows from query result
    return properties;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all properties.");
  }
}

export async function fetchPropertyPages(query: string) {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM estate_properties
      WHERE
        title ILIKE ${`%${query}%`} OR
        location ILIKE ${`%${query}%`} OR
        price::text ILIKE ${`%${query}%`} OR
        status ILIKE ${`%${query}%`}
    `;

    const ITEMS_PER_PAGE = 10; // Adjust this based on your desired page size
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);

    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of property pages.');
  }
}


export async function fetchFilteredProperties(
  query: string,
  currentPage: number,
  status: string,
) {
  console.log('Query:', query);
  console.log('status:', status);

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const properties = await sql<{
      id: string;
      title: string;
      price: number;
      location: string;
      beds: number;
      baths: number;
      area: number;
      images: string[];
      status: 'available' | 'sold' | 'pending';
    }>`
      SELECT
        id,
        title,
        price,
        location,
        beds,
        baths,
        area,
        images,
        status
      FROM estate_properties
      WHERE
        title ILIKE ${`%${query}%`} OR
        location ILIKE ${`%${query}%`} OR
        price::text ILIKE ${`%${query}%`} OR
        beds::text ILIKE ${`%${query}%`} OR
        baths::text ILIKE ${`%${query}%`} OR
        area::text ILIKE ${`%${query}%`} OR
        status ILIKE ${`%${status}%`}
      ORDER BY price ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return properties.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch properties.');
  }
}


export async function fetchPropertyById(id: string) {
  try {
    const property = await sql<{
      id: string;
      title: string;
      price: number;
      location: string;
      beds: number;
      baths: number;
      area: number;
      images: string[];
      status: 'available' | 'sold' | 'pending';
      is_favourite: boolean;
    }>`
      SELECT
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
      FROM estate_properties
      WHERE id = ${id}
      LIMIT 1
    `;

    if (property.rowCount === 0) {
      throw new Error('Property not found.');
    }

    return property.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch property with id: ${id}`);
  }
}
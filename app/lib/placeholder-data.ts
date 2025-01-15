const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442d',
    name: 'User',
    email: 'user3@nextlail.com',
    password: '123456',
  },
];

const properties = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a64429',
    title: 'Modern Waterfront Home',
    price: 1579500,
    location: 'Miami Beach, FL',
    beds: 4,
    baths: 3.5,
    area: 3200,
    images: [
      '/properties/waterfront-villa-1.png',
      '/properties/waterfront-villa-2.png',
      '/properties/waterfront-villa-3.png'
    ],
    status: 'available',
    is_favourite: false
  },
];

// Type definition for TypeScript
type Property = {
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
};

export { properties, users };
export type { Property };
'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';


export async function updatePropertyFavoriteStatus(id: string, formData: FormData) {
    // Parse the `is_favorite` value from the form data
    const { isFavorite } = {
        isFavorite: formData.get('is_favorite') === 'true'
    };

    try {
        // Update the `is_favorite` status for the given property ID
        await sql`
      UPDATE estate_properties
      SET is_favourite = ${isFavorite}
      WHERE id = ${id}
    `;

        // Revalidate the property page
        revalidatePath(`/property/${id}`);

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to update the favorite status of the property.');
    }
}
import { fetchFilteredProperties, fetchProperties } from "@/app/lib/data";
import { Card } from "../dashboard/cards";

export default async function PropertyList({
    query,
    currentPage,
    status,
}: {
    query: string;
    currentPage: number;
    status: string;
}) {
    const properties = await fetchFilteredProperties(
        query,
        currentPage,
        status
    );
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {properties.map((property) => (
                <Card
                    // @ts-ignore
                    title={property.title}
                    price={property.price}
                    status={property.status}
                    image={property.images}
                    id={property.id}
                />
            ))}
        </div>
    );
}

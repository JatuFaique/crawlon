import { updatePropertyFavoriteStatus } from "@/app/lib/actions";
import { fetchPropertyById } from "@/app/lib/data";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    // Get the dynamic route parameters
    console.log(params?.id);
    const property = await fetchPropertyById(params.id);

    const updatePropertyWithId = updatePropertyFavoriteStatus.bind(
        null,
        params.id
    );
    return (
        <div className="max-w-5xl mx-auto mt-10 p-5">
            {/* Title */}
            <h1 className="text-3xl font-bold mb-4">{property.title}</h1>

            {/* Property Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Image Gallery */}
                <div className="space-y-4 h-[350px] overflow-auto scrollbar-none">
                    {property.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Property Image ${index + 1}`}
                            className="w-full h-auto rounded-lg shadow"
                        />
                    ))}
                </div>

                {/* Details */}
                <div>
                    <p className="text-lg">
                        <strong>Price:</strong>{" "}
                        <span className="text-blue-600 font-semibold">
                            ${property.price}
                        </span>
                    </p>
                    <p className="text-lg">
                        <strong>Location:</strong> {property.location}
                    </p>
                    <p className="text-lg">
                        <strong>Beds:</strong> {property.beds}
                    </p>
                    <p className="text-lg">
                        <strong>Baths:</strong> {property.baths}
                    </p>
                    <p className="text-lg">
                        <strong>Area:</strong> {property.area} sq. ft.
                    </p>
                    <p className="text-lg">
                        <strong>Status:</strong>{" "}
                        <span
                            className={`${
                                property.status === "available"
                                    ? "text-green-500"
                                    : "text-red-500"
                            } font-medium`}
                        >
                            {property.status}
                        </span>
                    </p>
                </div>
            </div>

            {/* Description */}
            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Praesentium pariatur numquam non dolores velit ullam officia
                    rerum eius! Aut modi voluptates quasi molestiae eos magni
                    obcaecati officiis vitae illo veniam.
                </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex space-x-4">
                <form action={updatePropertyWithId}>
                    <input
                        type="hidden"
                        name="is_favorite"
                        value={property.is_favourite ? "false" : "true"}
                    />
                    {property.is_favourite ? (
                        <button
                            type="submit"
                            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600"
                        >
                            Remove Favourite
                        </button>
                    ) : (
                        <>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-200"
                            >
                                Favourite
                            </button>
                        </>
                    )}
                </form>

                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700">
                    Buy Now
                </button>
            </div>
        </div>
    );
}

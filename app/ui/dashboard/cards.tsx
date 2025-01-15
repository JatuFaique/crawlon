"use client";
import { lusitana } from "@/app/ui/font";
import Image from "next/image";
import { Button } from "../button";
import { redirect } from "next/navigation";

export function Card({
    title,
    price,
    status,
    image,
    id,
}: {
    title: string;
    price: number | string;
    status: "available" | "sold" | "pending";
    image: string[]; // URL to the product image
    id: string;
}) {
    // @ts-ignore
    const handleRedirect = (id) => {
        // Redirect to the product details page
        redirect(`/listing/${id}`);
    };
    return (
        <div className="rounded-xl border border-gray-200 bg-gray-50 shadow-sm overflow-hidden">
            {/* Product Image */}
            <Image
                src={image[0]}
                alt={title}
                width={400}
                height={400}
                className="h-40 w-full object-cover"
            />

            {/* Product Details */}
            <div className="p-4">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 truncate">
                    {title}
                </h3>

                {/* Price and Status */}
                <div className="flex items-center justify-between mt-2">
                    <p
                        className={`${lusitana.className} text-xl text-blue-600`}
                    >
                        ${price}
                    </p>
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            status === "available"
                                ? "bg-green-100 text-green-800"
                                : status === "sold"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                        {status}
                    </span>
                </div>
            </div>
            <Button
                onClick={() => handleRedirect(id)}
                className="w-full py-2 bg-blue-600 text-white"
            >
                Go to Details
            </Button>
        </div>
    );
}

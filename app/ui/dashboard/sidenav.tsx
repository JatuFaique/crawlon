"use client";
import Link from "next/link";
import AcmeLogo from "@/app/ui/acme-logo";
import {
    CheckIcon,
    ClockIcon,
    PowerIcon,
    ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import {
    useSearchParams,
    usePathname,
    useRouter,
    redirect,
} from "next/navigation";
import { useState } from "react";
import Search from "../search";

export default function SideNav() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace, back } = useRouter();
    const selectedStatus = searchParams.get("status");

    // Check if we're on a details page by looking for a UUID pattern after /listing/
    const isDetailsPage =
        /\/listing\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/.test(
            pathname
        );

    const handleStatusChange = (status: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (status) {
            params.set("status", status);
        } else {
            params.delete("status");
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
                className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
                href="/"
            >
                <div className="w-32 text-white md:w-40">
                    <AcmeLogo />
                </div>
            </Link>
            <Search placeholder="Search invoices..." />
            <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                {isDetailsPage ? (
                    // Back button for details page
                    <button
                        onClick={() => redirect("/listing")}
                        className="flex h-[48px] w-full items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                        Back to Listings
                    </button>
                ) : (
                    // Filters for main listing page
                    <>
                        Filter
                        <div className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                            <div className="w-full flex flex-wrap gap-2">
                                <div className="flex items-center">
                                    <input
                                        id="Available"
                                        name="status"
                                        type="radio"
                                        value="available"
                                        checked={selectedStatus === "available"}
                                        onChange={() =>
                                            handleStatusChange("available")
                                        }
                                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                    />
                                    <label
                                        htmlFor="pending"
                                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                                    >
                                        Available{" "}
                                        <ClockIcon className="h-4 w-4" />
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="sold"
                                        name="status"
                                        type="radio"
                                        value="sold"
                                        checked={selectedStatus === "sold"}
                                        onChange={() =>
                                            handleStatusChange("sold")
                                        }
                                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                    />
                                    <label
                                        htmlFor="sold"
                                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                                    >
                                        Sold <CheckIcon className="h-4 w-4" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

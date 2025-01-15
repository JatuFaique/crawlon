"use client";

import { useEffect } from "react";
import {
    ExclamationTriangleIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
            <div className="text-center space-y-6">
                <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto" />

                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Something went wrong!
                    </h2>
                    <p className="text-gray-600">
                        We're sorry for the inconvenience. Please try again.
                    </p>
                </div>

                <button
                    onClick={() => reset()}
                    className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 space-x-2"
                >
                    <ArrowPathIcon className="w-5 h-5" />
                    <span>Try again</span>
                </button>
            </div>
        </div>
    );
}

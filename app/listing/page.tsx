import { fetchProperties, fetchPropertyPages } from "../lib/data";
import { Card } from "../ui/dashboard/cards";
import Pagination from "../ui/invoices/pagination";
import PropertyList from "../ui/PropertyList/PropertyList";
import Search from "../ui/search";

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
        status?: string;
    }>;
}) {
    const properties = await fetchProperties();
    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
    const status = searchParams?.status || "";
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchPropertyPages(query);
    return (
        <div>
            <PropertyList
                status={status}
                query={query}
                currentPage={currentPage}
            />

            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}

import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/lib/trpc";

export function TRPCExample() {

    const healthQuery = useQuery(trpc.health.check.queryOptions());

    const handleRefresh = () => {
        healthQuery.refetch();
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">tRPC Example</h2>

            {/* Health Check */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Health Check</h3>
                <p className="text-sm text-gray-600">
                    Status: {healthQuery.data?.status} | Time: {healthQuery.data?.timestamp}
                </p>
                <button
                    onClick={handleRefresh}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Refresh Data
                </button>
                {healthQuery.isFetching && (
                    <p className="text-xs text-gray-500 mt-1">Fetching fresh data...</p>
                )}
            </div>

        </div>
    );
} 
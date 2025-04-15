import {Outlet, createRootRoute} from '@tanstack/react-router'
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()
export const Route = createRootRoute({
    component: () => (
        <>
            <QueryClientProvider client={queryClient}>
                <Outlet/>
            </QueryClientProvider>
        </>
    ),
})

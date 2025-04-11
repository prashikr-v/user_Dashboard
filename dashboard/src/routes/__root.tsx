import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ErrorBoundary } from '../components/ErrorBoundary'


export const Route = createRootRoute({
  component: () => (
    <>
     <ErrorBoundary >   
      <Outlet />
      </ErrorBoundary>
      <TanStackRouterDevtools />
    

    </>
  ),
})
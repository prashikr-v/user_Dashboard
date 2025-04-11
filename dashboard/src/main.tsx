import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import { ErrorBoundary } from "react-error-boundary";

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient();
// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ErrorBoundary fallback={<div>Sbygbhomething went wrong</div>}>
      <QueryClientProvider client={queryClient}>
      <MantineProvider >
      <RouterProvider router={router} />
      
      </MantineProvider>
      </QueryClientProvider>
      </ErrorBoundary>
    </StrictMode>
  )
}
'use client'
//The 'use client' directive makes this file a Client Component.
 
import dynamic from 'next/dynamic'
 
//The dynamic import with ssr: false disables server-side rendering for the <App /> component, 
// making it truly client-only (SPA).
const App = dynamic(() => import('../../App'), { ssr: false })
 
export function ClientOnly() {
  return <App />
}
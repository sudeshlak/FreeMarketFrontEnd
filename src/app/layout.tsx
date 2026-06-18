import type { Metadata } from 'next'
import '../App.scss'

export const metadata: Metadata = {
  title: 'Free Market',
  description: 'Web site created with Next.js.',
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
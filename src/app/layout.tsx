import { Metadata } from "next";
import './App.scss';

export const metadata: Metadata = {
    title: 'Free market',
    themeColor:'000000',
    description: 'Web site created with Next.js.',
  }
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <html lang="en">
                <head>
                    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
                </head>
                <body>
                    <div id="root">{children}</div>
                </body>
        </html> 
    );
  }
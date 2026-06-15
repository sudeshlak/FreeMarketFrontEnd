//This tells Next.js to generate a single route for the empty slug (/),
// effectively mapping all routes to the same page.
// This page is a Server Component, prerendered into static HTML.
import { ClientOnly } from "./client";

export function generateStaticParams() {
  const paths = [
    [], // /
    ["checkout"],
    ["register"],
    ["login"],
    ["admin"],
    ["FAQ"],
    ["about_us"],
    ["contact_us"],
    ["userAccount"],
    ["deliveryArea"],
    ["admin", "adminProductList"],
    ["admin", "orders"],
    ["admin", "coupons"],
  ];
  return paths.map((slug) => ({ slug }));
}

export default function Page() {
  return <ClientOnly />;
}

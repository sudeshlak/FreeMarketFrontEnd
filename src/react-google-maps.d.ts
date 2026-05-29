import { ReactNode } from "react";

declare module "react-google-maps/lib/components/GoogleMap" {
  export interface GoogleMapProps {
    children?: ReactNode;
  }
}

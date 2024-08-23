import { Vehicle } from "./Vehicle";

  
  export interface VehiclePerType {
    type: string;
    quantity: number;
    vehicles: Vehicle[];
  }
  
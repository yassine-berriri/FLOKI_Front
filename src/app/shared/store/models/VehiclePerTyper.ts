export interface Vehicle {
    make: string;
    model: string;
  }
  
  export interface VehiclePerType {
    type: string;
    quantity: number;
    vehicles: Vehicle[];
  }
  
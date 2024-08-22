
export enum KindTypeVehicle {
    Truck = 'Truck (Camion)',
    Van = 'Van (Fourgonnette)',
    FlatbedTruck = 'Flatbed Truck (Camion à plateau)',
    Car = 'Car (voiture)',
    PickupTruck = 'Pickup Truck (Camionnette)',
    RefrigeratedTruck = 'Refrigerated Truck (Camion frigorifique)'
  }

export interface VehicleType {
    id: number;
    imageUrl: string;
    title: KindTypeVehicle;
    isSelected: boolean;
  }
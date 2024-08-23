import { Paiemnent } from "./Paiement";

export interface Vehicle {
    make: string;      // Marque du véhicule
    model: string;     // Modèle du véhicule
    maxWeight: number;  // Poids maximum en kilos
    pricePerKilo: Paiemnent; // Prix par kilo
  }
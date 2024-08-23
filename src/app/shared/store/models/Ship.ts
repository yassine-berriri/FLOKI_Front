import { Vehicle } from "./Vehicle";
import { VehiclePerType } from "./VehiclePerTyper";

export interface Ship {
    id?: number;              // Identifiant de l'expédition (optionnel pour la création)
    startLocation: string;    // Point de départ
    endLocation: string;      // Point d'arrivée
    startDate: Date;          // Date de départ
    endDate: Date;            // Date d'arrivée
    vehicle: VehiclePerType[];         // Informations sur le véhicule
    availableSpace: number;   // Espace disponible (calculé)
    phoneNumber: string[];      // Numéro de téléphone du transporteur
    maxWeight: number;        // Poids maximum en kilos
    pricePerParcel: number;   // Prix par colis
  }
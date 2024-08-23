export enum KindUnit {
    euro = 'euro',
    dollar = 'dollar',
    pound = 'pound',
    dinar = 'dinar',
  }


export interface Paiemnent {
price: number;
unit: string;
}
export class Transporter {
  constructor(
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
   // public phoneNumber: string = '',
    public address: string = '',
    public city: string = '',
    public country: string = '',
    public zipCode: string = '',
    public username: string = '',
    public password: string = ''
  ) {}

  // Méthode pour mettre à jour les propriétés
  /*
  updateDetails(details: Partial<Transporter>) {
    Object.assign(this, details);
  }
  */
}


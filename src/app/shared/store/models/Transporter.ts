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
  updateDetails(details: Partial<Transporter>) {
    Object.assign(this, details);
  }
}

// Créez une instance
let transporter = new Transporter();

// Mettez à jour les propriétés
transporter.updateDetails({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
 // phoneNumber: '123-456-7890',
  address: '1234 Main St',
  city: 'Anytown',
  country: 'USA',
  zipCode: '12345',
  username: 'johndoe',
  password: 'securepassword'
});

import { Transporter } from './Transporter';

export class SignUpRequestTransporter {
  code: string;
  transporter: Transporter;

  constructor(code: string, transporter: Transporter) {
    this.transporter = transporter;
    this.code = code;
  }
}

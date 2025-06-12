export class DoctorSignupDto {
  email!: string;
  password!: string;
  name!: string;
  mobile?: string;
  place?: string;
  specialization?: string;
  languages?: string[];
  dciRegistrationNumber!: string;
}

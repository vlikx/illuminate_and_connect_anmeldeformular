
export type RoleOption =
  | 'Studierende/r'
  | 'Freund, Familie'
  | 'Hochschulangehörige/e'
  | 'Firmenvertreter/in'
  | 'Absolvent/in'
  | 'Sonstige Rolle';

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: RoleOption | '';
  comments?: string;
  acceptPrivacy: boolean;
  acceptProcessing: boolean;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  acceptPrivacy?: string;
  acceptProcessing?: string;
}
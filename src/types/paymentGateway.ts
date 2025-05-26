export interface PaymentGateway {
  id: number;
  _id?: string; // MongoDB ID for API operations
  publicName: string;
  privateName: string;
  linkKeyToken?: string;
  key?: string;
  isEnabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}

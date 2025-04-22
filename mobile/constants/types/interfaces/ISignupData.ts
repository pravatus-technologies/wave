export interface ISignupData {
  email: string;
  password: string;
  givenNames: string;
  lastName: string;
  birthday: string;
  isAgreedToTerms: boolean;
  pictureUri: string | null;
}
export interface IProfile {
  email?: string | undefined;
  givenNames?: string | undefined;
  lastName?: string | undefined;
  birthday?: string | undefined;
  isAgreedToTerms?: boolean | undefined;
  pictureUri: string | null | undefined;
}

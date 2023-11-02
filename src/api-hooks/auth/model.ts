import { Expose } from 'class-transformer';

// Model

export class OutletEntityModel {
  id: string;
  name: string;
  address: string | null;

  @Expose({ name: 'is_assigned' })
  isAssigned: boolean;
}

export class TokenResultModel {
  @Expose({ name: 'token_type' })
  tokenType: string;

  @Expose({ name: 'expires_in' })
  expiresIn: number;

  @Expose({ name: 'access_token' })
  accessToken: string;

  @Expose({ name: 'refresh_token' })
  refreshToken: string;
}

// Input

export class LoginMutationInput {
  email: string;
  password: string;
}

export class RefreshTokenMutationInput {
  refreshToken: string;
}

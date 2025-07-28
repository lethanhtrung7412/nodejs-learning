import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  firstName?: string;

  @Expose()
  lastName?: string;

  @Expose()
  displayName?: string;

  @Expose()
  avatarUrl?: string;

  @Expose()
  preferredLanguage?: string;

  @Expose()
  isActive: boolean;

  @Expose()
  lastLoginAt?: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Exclude()
  zitadelId: string; // Hide sensitive Zitadel ID from API responses

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  get fullName(): string {
    if (this.firstName && this.lastName) {
      return `${this.firstName} ${this.lastName}`;
    }
    return this.displayName || this.email;
  }
}

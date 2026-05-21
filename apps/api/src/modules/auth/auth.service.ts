import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { RoleName } from '../../common/enums';

@Injectable()
export class AuthService {
  getCurrentUser() {
    return {
      id: 'demo-super-admin',
      name: 'Demo Super Admin',
      email: 'admin@example.com',
      roles: [RoleName.SuperAdmin],
      permissions: ['offices:approve', 'payments:refund', 'analytics:platform'],
      officeIds: [],
      mfaRequired: true,
    };
  }

  createInvitation(input: { email: string; role: RoleName; officeId?: string }) {
    return {
      id: randomUUID(),
      ...input,
      status: 'pending',
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    };
  }
}

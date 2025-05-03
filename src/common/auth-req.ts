import { UserRole } from 'src/user/user.schema';

export interface AuthRequest extends Request {
  user: {
    _id: string;
    email: string;
    role: UserRole;
  };
}

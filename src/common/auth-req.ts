export interface AuthRequest extends Request {
  user: {
    _id: string;
    email: string;
  };
}

export enum AssignedUserStatus {
  COMPLETED = 'completed',
  SCHEDULED = 'scheduled',
  CANCELLED = 'cancelled',
  PENDING = 'pending',
}

export enum PaymentStatus {
  PAID = 'paid',
  UNPAID = 'unpaid',
}

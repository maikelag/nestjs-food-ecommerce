import { Document } from 'mongoose';

export interface Permission extends Document {
  readonly _id: string;
  readonly permission: string;
}

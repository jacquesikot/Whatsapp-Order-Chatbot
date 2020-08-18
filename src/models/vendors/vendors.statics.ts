import { IVendorDocument, IVendorModel } from './vendors.types';

export async function findByName(
  this: IVendorModel,
  { name }: { name: string }
): Promise<IVendorDocument[]> {
  return this.find({ name });
}

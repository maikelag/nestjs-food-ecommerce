export interface GeneralServicesInterface<T> {
  findAll(): Promise<T[]>;
  findById(id: string | number): Promise<T>;
  createOne(newData: object): Promise<T>;
  removeById(id: string | number): Promise<T>;
}

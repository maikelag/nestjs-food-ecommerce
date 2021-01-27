import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { GeneralServicesInterface } from '../interfaces/services.interface';
import { PaginateOptions } from '../interfaces/paginate-options-interface';

@Injectable()
export abstract class BaseService<T extends Document>
  implements GeneralServicesInterface<T> {

  protected constructor(protected baseModel: Model<T>) {}

  async findAll(): Promise<T[]> {
    return this.baseModel.find();
  }

  async findAllPaginate(optionsPaginate: PaginateOptions): Promise<any> {
    const it = this.baseModel
      .find()
      .populate(optionsPaginate.relations)
      .skip(optionsPaginate.perPage * (optionsPaginate.page - 1))
      .limit(optionsPaginate.perPage)
      .sort(optionsPaginate.order);
    return it;
  }

  async findById(id: string): Promise<T> {
    return this.baseModel.findById(id);
  }

  async removeById(id: string): Promise<T> {
    return this.baseModel.findByIdAndDelete(id);
  }

  async createOne(roleData: any): Promise<T> {
    const newItem = new this.baseModel(roleData);
    await newItem.save();
    return newItem;
  }
}

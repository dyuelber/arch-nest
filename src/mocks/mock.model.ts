import { faker } from '@faker-js/faker';

export class Mock {
  private static mockClass;

  static set(mockClass?: unknown) {
    Mock.mockClass = mockClass;
    return this;
  }

  static unset() {
    jest.restoreAllMocks();
  }

  static faker() {
    return faker;
  }

  static aggregate(response?) {
    return jest
      .spyOn(Mock.mockClass, 'aggregate')
      .mockResolvedValue([response]);
  }

  static paginate(response?) {
    return jest.spyOn(Mock.mockClass, 'paginate').mockResolvedValue(response);
  }

  static findById(response?: unknown) {
    return jest.spyOn(Mock.mockClass, 'findById').mockResolvedValue(response);
  }

  static create(response?: unknown) {
    return jest.spyOn(Mock.mockClass, 'create').mockResolvedValue([response]);
  }

  static findOneAndUpdate(response?: unknown) {
    return jest
      .spyOn(Mock.mockClass, 'findOneAndUpdate')
      .mockResolvedValue(response);
  }

  static findOneAndDelete(response?: unknown) {
    return jest
      .spyOn(Mock.mockClass, 'findOneAndDelete')
      .mockResolvedValue(response);
  }
}

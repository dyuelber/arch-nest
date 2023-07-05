import { faker } from '@faker-js/faker';

export class Mock {
  private static mockClass;

  static set(mockClass?: unknown) {
    Mock.mockClass = mockClass;
    return this;
  }

  static faker() {
    return faker;
  }
  // TODO: implement mock chained method
  static find(response?: unknown) {
    jest.spyOn(Mock.mockClass, 'aggregate').mockResolvedValue([response]);
  }

  static findById(response?: unknown) {
    jest.spyOn(Mock.mockClass, 'findById').mockResolvedValue(response);
  }

  static create(response?: unknown) {
    jest.spyOn(Mock.mockClass, 'create').mockResolvedValue([response]);
  }

  static findOneAndUpdate(response?: unknown) {
    jest.spyOn(Mock.mockClass, 'findOneAndUpdate').mockResolvedValue(response);
  }

  static findOneAndDelete(response?: unknown) {
    jest.spyOn(Mock.mockClass, 'findOneAndDelete').mockResolvedValue(response);
  }
}

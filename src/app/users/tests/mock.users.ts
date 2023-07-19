import { Mock } from '../../../mocks/mock.model';
import { Users } from '../entities/user.entity';

export class MockUsers extends Mock {
  static createData(): Users {
    return {
      name: 'My User',
      age: 34,
    };
  }

  static respSuccess() {
    return {
      _id: '64a5ab356b51623dd698d98d',
      name: 'My User',
      age: '34',
      createdAt: '2023-07-05T17:41:09.699Z',
      updatedAt: '2023-07-05T17:41:09.699Z',
    };
  }

  static respFind() {
    return {
      results: [
        {
          _id: '64a5ab356b51623dd698d98d',
          name: 'My Doido 20844fa0-1b5b-11ee-a2c1-956818c8107f',
          age: 9,
          createdAt: '2023-07-05T17:41:09.699Z',
          updatedAt: '2023-07-05T17:41:09.699Z',
        },
        {
          _id: '649c341b507ea463a7ac819c',
          name: 'My Doido d8505ac0-15b6-11ee-a179-01614183abe8',
          age: 35,
          createdAt: '2023-06-28T13:22:35.262Z',
          updatedAt: '2023-06-28T13:22:35.262Z',
        },
      ],
      paginate: {
        perPage: 2,
        page: 1,
        pages: 15,
        total: 30,
      },
      sort: {
        field: '_id',
        order: 'DESC',
      },
    };
  }
}

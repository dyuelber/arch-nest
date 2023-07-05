import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { Users } from '../entities/user.entity';
import { getModelToken } from '@nestjs/mongoose';
import { MockUsers } from './mock.users';
import { Event } from '../../../events/events.service';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(Users.name), useValue: Model },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    Event.dispatch = jest.fn();

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('success', async () => {
      const mockedResponse = MockUsers.respSuccess();

      MockUsers.set(Model<Users>).create(mockedResponse);

      const response = await service.create(MockUsers.createData());

      expect(response).toEqual(mockedResponse);
    });
  });

  describe('update', () => {
    it('success', async () => {
      const mockedResponse = MockUsers.respSuccess();

      MockUsers.set(Model<Users>).findOneAndUpdate(mockedResponse);

      const id = '64a5ab356b51623dd698d98d';
      const response = await service.update(id, MockUsers.createData());

      expect(response).toEqual(mockedResponse);
    });

    it('error', async () => {
      const mockedResponse = MockUsers.respSuccess();

      MockUsers.set(Model<Users>).findOneAndUpdate(mockedResponse);

      try {
        const id = '64a5ab356b51623dd698d98';
        await service.update(id, MockUsers.createData());
      } catch (error) {
        expect(error.message).toEqual('Bad Request');
        expect(error instanceof BadRequestException);
      }
    });
  });

  describe('find', () => {
    it.skip('success', async () => {
      const mockedResponse = MockUsers.respFind();

      MockUsers.set(Model<Users>).find(mockedResponse);

      const response = await service.find({ page: '1', perPage: '2' });

      expect(response).toEqual(mockedResponse);
    });
  });

  describe('findById', () => {
    it('success', async () => {
      const mockedResponse = MockUsers.respSuccess();

      MockUsers.set(Model<Users>).findById(mockedResponse);

      const id = '64a5ab356b51623dd698d98d';
      const response = await service.findById(id);

      expect(response).toEqual(mockedResponse);
    });
  });

  describe('delete', () => {
    it('success', async () => {
      const mockedResponse = MockUsers.respSuccess();

      MockUsers.set(Model<Users>).findOneAndDelete(mockedResponse);

      const id = '64a5ab356b51623dd698d98d';
      const response = await service.delete(id);

      expect(response).toEqual(mockedResponse);
    });
  });
});

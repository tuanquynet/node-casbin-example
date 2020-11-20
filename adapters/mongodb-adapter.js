import { MongoAdapter } from 'casbin-mongodb-adapter';

module.exports = {
  async create() {
    return MongoAdapter.newAdapter({
      uri: 'mongodb://localhost:27017',
      collectionName: 'casbin',
      databaseName: 'node-casbin-official',
      option: {
        useNewUrlParser: true,
        authSource: 'admin',
        auth: {
          user: 'admin',
          password: '123456',
        },
        authMechanism: 'SCRAM-SHA-1',
      },
    });
  },
};

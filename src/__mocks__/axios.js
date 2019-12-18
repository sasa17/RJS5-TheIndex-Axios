import { fakeAuthor } from "../testUtils";

module.exports = {
  get: jest.fn(() =>
    Promise.resolve({ data: [fakeAuthor(), fakeAuthor(), fakeAuthor()] })
  )
};

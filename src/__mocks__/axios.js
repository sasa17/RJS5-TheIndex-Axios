import { fakeAuthor, fakeAuthorDetail } from "../testUtils";

module.exports = {
  get: jest.fn(url => {
    if (url.startsWith("https://the-index-api.herokuapp.com/api/authors/10")) {
      return Promise.resolve({ data: fakeAuthorDetail({ id: 10 }) });
    } else if (
      url.startsWith("https://the-index-api.herokuapp.com/api/authors")
    ) {
      return Promise.resolve({
        data: [fakeAuthor({ id: 10 }), fakeAuthor(), fakeAuthor()]
      });
    }
  })
};

import casual from "casual";

casual.seed(555);

export const fakeBookId = () => casual.integer(0, 30);

export const fakeBook = overrides => ({
  id: casual.integer(0, 30),
  title: casual.title,
  color: casual.color_name,
  authors: [
    {
      name: casual.name,
      id: casual.integer(0, 30)
    }
  ],
  ...overrides
});

export const fakeAuthor = overrides => ({
  id: casual.integer(0, 30),
  first_name: casual.first_name,
  last_name: casual.last_name,
  imageUrl: casual.url,
  books: [fakeBookId(), fakeBookId(), fakeBookId()],
  ...overrides
});

export const fakeAuthorDetail = overrides => ({
  id: casual.integer(0, 30),
  first_name: casual.first_name,
  last_name: casual.last_name,
  imageUrl: casual.url,
  books: [fakeBook(), fakeBook(), fakeBook()],
  ...overrides
});

export const type = (wrapper, name, value) => {
  wrapper.find(`input[name="${name}"]`).simulate("change", {
    target: { name, value }
  });
};

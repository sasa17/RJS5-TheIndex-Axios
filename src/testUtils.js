import casual from "casual";

casual.seed(555);

export const fakeBook = overrides => ({
  title: casual.title,
  color: casual.color_name,
  ...overrides
});

export const fakeAuthor = overrides => ({
  first_name: casual.first_name,
  last_name: casual.last_name,
  imageUrl: casual.url,
  books: Array.from({ length: Math.floor(Math.random * 20) }, () => fakeBook()),
  ...overrides
});

export const type = (wrapper, name, value) => {
  wrapper.find(`input[name="${name}"]`).simulate("change", {
    target: { name, value }
  });
};

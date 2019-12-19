//Imports
import React from "react";
import { shallow } from "enzyme";

// Component
import BookRow from "../BookRow";

//Mocks
import { fakeBook } from "../testUtils";

describe("<BookRow />", () => {
  it("can handle multiple authors", () => {
    const book = fakeBook({
      authors: [
        {
          name: "Neil Gaiman",
          id: 15
        },
        {
          name: "Terry Pratchett",
          id: 14
        }
      ]
    });
    const wrapper = shallow(<BookRow key={book.title} book={book} />);

    expect(wrapper.text().includes("Neil")).toBe(true);
    expect(wrapper.text().includes("Terry")).toBe(true);
  });
});

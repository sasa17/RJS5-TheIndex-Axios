//Imports
import React from "react";
import { mount } from "enzyme";
import wait from "waait";

// Component
import App from "../App";

//Mocks
import mockAxios from "axios";
import { fakeAuthor } from "../testUtils";

describe("<App />", () => {
  afterEach(() => {
    mockAxios.get.mockClear();
  });

  describe("'authors' state", () => {
    it("is initially an empty array", () => {
      const wrapper = mount(<App />);
      expect(wrapper.state().authors.length).toBe(0);
      expect(wrapper.find(".card").length).toBe(0);
    });

    it("is used to render the authors in the list", () => {
      const wrapper = mount(<App />);
      const authors = [fakeAuthor(), fakeAuthor(), fakeAuthor(), fakeAuthor()];
      wrapper.setState({ authors, loading: false });
      expect(wrapper.find(".card").length).toBe(4);
    });
  });

  describe("axios request", () => {
    it("is a GET request", async () => {
      const wrapper = mount(<App />);
      await wait();
      wrapper.update();
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });

    it("makes the request to the correct url", async () => {
      const wrapper = mount(<App />);
      await wait();
      wrapper.update();
      expect(mockAxios.get).toHaveBeenCalledWith(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
    });

    it("is used to change the 'authors' state", async () => {
      const wrapper = mount(<App />);
      await wait();
      wrapper.update();
      expect(wrapper.state().authors.length).toBe(3);
    });
  });

  describe("'loading' state", () => {
    it("is initially set to true", () => {
      const wrapper = mount(<App />);
      expect(wrapper.state().loading).toBe(true);
    });

    it("is set to false when authors are fetched successfully", async () => {
      const wrapper = mount(<App />);
      await wait();
      wrapper.update();
      expect(wrapper.state().loading).toBe(false);
    });
  });

  describe("<Loading /> component", () => {
    it("is rendered while the authors are being fetched", () => {
      const wrapper = mount(<App />);
      expect(wrapper.find("Loading").exists()).toBe(true);
    });

    it("replaces the entire author list while authors are being fetched", () => {
      const wrapper = mount(<App />);
      expect(wrapper.find("AuthorList").exists()).toBe(false);
    });

    it("is NOT rendered after the authors are fetched", async () => {
      const wrapper = mount(<App />);
      await wait();
      wrapper.update();
      expect(wrapper.find("Loading").exists()).toBe(false);
      expect(wrapper.find("AuthorList").exists()).toBe(true);
    });
  });

  describe("When a card is clicked", () => {
    it("makes a GET request", async () => {
      const wrapper = mount(<App />);
      await wait();
      wrapper.update();
      const card = wrapper.find(".card").at(0);
      card.simulate("click");
      await wait();
      wrapper.update();
      expect(mockAxios.get).toHaveBeenCalledTimes(2);
    });

    it("makes the request to the correct url", async () => {
      const wrapper = mount(<App />);
      await wait();
      wrapper.update();
      const card = wrapper.find(".card").at(0);
      card.simulate("click");
      await wait();
      wrapper.update();
      expect(mockAxios.get).toHaveBeenCalledWith(
        `https://the-index-api.herokuapp.com/api/authors/10/`
      );
    });

    it("changes the loading state to true, then false after the axios request", async () => {
      const wrapper = mount(<App />);
      await wait();
      wrapper.update();
      const card = wrapper.find(".card").at(0);
      card.simulate("click");
      expect(wrapper.state().loading).toBe(true);
      await wait();
      wrapper.update();
      expect(wrapper.state().loading).toBe(false);
    });
  });
});

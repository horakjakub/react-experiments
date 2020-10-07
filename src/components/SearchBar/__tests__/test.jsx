import React from "react";
import { render, fireEvent, createEvent } from "@testing-library/react";
import { Search, withOnChange } from "../index";

describe("<Search />", () => {
  it("renders correctly", () => {
    const { container } = render(<Search phrase="" setPhrase={() => {}} />);
    expect(container).toMatchSnapshot();
  });

  it('should pass typed phrase into "setPhrase" prop function', () => {
    const spy = jest.fn();
    const { getByPlaceholderText } = render(
      <Search phrase="" setPhrase={spy} />
    );
    const searchEl = getByPlaceholderText("start typing to search");
    const changeEvent = createEvent.change(searchEl, {
      target: { value: "cat" },
    });

    fireEvent.change(searchEl, changeEvent);

    expect(spy.mock.calls).toEqual([["cat"]]);
  });

  it('should pass "phrase" prop into search input value', () => {
    const { getByPlaceholderText } = render(
      <Search phrase="tiger" setPhrase={() => {}} />
    );
    const searchInput = getByPlaceholderText("start typing to search");

    expect(searchInput.value).toEqual("tiger");
  });
});

describe("withOnChange()", () => {
  it("should return function", () => {
    expect(typeof withOnChange(() => {})).toBe("function");
  });

  it("should always return new function", () => {
    const funcToWrap = () => {};
    const firstFunc = withOnChange(funcToWrap);
    const secondFunc = withOnChange(funcToWrap);

    expect(firstFunc === secondFunc).toBeFalsy();
  });

  it('should return function which called with ChangeEvent as an argument, will use "target.value" property', () => {
    const spy = jest.fn();
    const funcToTest = withOnChange(spy);
    const changeEventMock = {
      target: {
        value: "mock",
      },
    };

    funcToTest(changeEventMock);

    expect(spy.mock.calls).toEqual([["mock"]]);
  });
});

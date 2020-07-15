import React, {ChangeEvent} from 'react';
import {render, fireEvent, screen, createEvent} from '@testing-library/react';
import {Search, withOnChange} from '../index';

describe('<Search />', () => {
  it('should pass typed phrase into "setPhrase" prop function', () => {
    const spy = jest.fn();
    render(<Search phrase="" setPhrase={spy} />);
    const searchEl = screen.getByPlaceholderText('start typing to search');
    const changeEvent = createEvent.change(searchEl, {target: {value: 'cat'}});

    fireEvent.change(searchEl, changeEvent);

    expect(spy.mock.calls).toEqual([['cat']]);
  });

  it('should pass "phrase" prop into search input value', () => {
    render(<Search phrase="tiger" setPhrase={() => {}} />);
    const searchEl = screen.getByPlaceholderText('start typing to search');

    expect(searchEl.value).toEqual('tiger');
  });
});

describe('withOnChange', () => {
  it('should return function', () => {
    expect(typeof withOnChange(() => {})).toBe('function');
  });

  it('should always return new function', () => {
    const funcToWrap = () => {};
    const firstFunc = withOnChange(funcToWrap);
    const secondFunc = withOnChange(funcToWrap);

    expect(firstFunc === secondFunc).toBeFalsy();
  });

  it('should return function, which called with change event will use "target.value" property', () => {
    const spy = jest.fn();
    const funcToTest = withOnChange(spy);
    const changeEventMock = {
      target: {
        value: 'mock',
      },
    };

    funcToTest(changeEventMock);

    expect(spy.mock.calls).toEqual([['mock']]);
  });
});

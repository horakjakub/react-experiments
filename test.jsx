import React, {ChangeEvent} from 'react';
import {render} from '@testing-library/react';
import {withOnChange} from '../index';

test('renders SearchBar component', () => {});

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

  it('should return function, which called with event, will use target value', () => {
    const spy = jest.fn();
    const func = withOnChange(spy);
    const changeEventMock  = {
      target: {
        value: 'mock',
      },
    };

    func(changeEventMock);

    expect(...spy.mock.calls).toEqual(['mock']);
  });
});

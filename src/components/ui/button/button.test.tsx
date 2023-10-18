import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from './button';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Тестирование кнопок', () => {
  it('Корректно отрисовывает кнопки без текста', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Корректно отрисовывает кнопки с текстом', () => {
    const tree = renderer.create(<Button text="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Корректно отрисовывает заблокированные кнопки', () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Корректно отрисовывает кнопки c индикацией загрузки', () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Корректно вызывает колбек при клике на кнопку', () => {
    const callbackFunction = jest.fn();
    render(<Button text="testCallback" onClick={callbackFunction} />);
    const button = screen.getByText("testCallback");
    fireEvent.click(button);
    expect(callbackFunction).toHaveBeenCalledTimes(1);
  })
})
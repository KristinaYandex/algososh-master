import { reverseString } from "./string";
import { ElementStates } from "../../types/element-states";

const setArray = jest.fn();
const setLoader = jest.fn();

describe('Тестирование алгоритма разворота строки', () => {
  it('Корректно разворачивает строку с чётным количеством символов', async () => {
    const startArray = [
      {value: 'm', color: ElementStates.Default},
      {value: 'o', color: ElementStates.Default},
      {value: 't', color: ElementStates.Default},
      {value: 'h', color: ElementStates.Default},
      {value: 'e', color: ElementStates.Default},
      {value: 'r', color: ElementStates.Default}
    ]
      
    const finalArray = [
      {value: 'r', color: ElementStates.Modified},
      {value: 'e', color: ElementStates.Modified},
      {value: 'h', color: ElementStates.Modified},
      {value: 't', color: ElementStates.Modified},
      {value: 'o', color: ElementStates.Modified},
      {value: 'm', color: ElementStates.Modified}
    ]

    await reverseString(startArray, setArray, setLoader);
    expect(setArray).toHaveBeenLastCalledWith(finalArray);
  })

  it('Корректно разворачивает строку с нечётным количеством символов', async () => {
    const startArray = [
      {value: 'h', color: ElementStates.Default},
      {value: 'e', color: ElementStates.Default},
      {value: 'l', color: ElementStates.Default},
      {value: 'l', color: ElementStates.Default},
      {value: 'o', color: ElementStates.Default}
    ]
      
    const finalArray = [
      {value: 'o', color: ElementStates.Modified},
      {value: 'l', color: ElementStates.Modified},
      {value: 'l', color: ElementStates.Modified},
      {value: 'e', color: ElementStates.Modified},
      {value: 'h', color: ElementStates.Modified}
    ]

    await reverseString(startArray, setArray, setLoader);
    expect(setArray).toHaveBeenLastCalledWith(finalArray);
  })

  it('Корректно разворачивает строку с одним символом', async () => {
    const startArray = [
      {value: 'i', color: ElementStates.Default}
    ]

    const finalArray = [
      {value: 'i', color: ElementStates.Modified}
    ]

    await reverseString(startArray, setArray, setLoader);
    expect(setArray).toHaveBeenLastCalledWith(finalArray);
  })

  it('Корректно разворачивает пустую строку', async () => {
    const startArray = [
      {value: '', color: ElementStates.Default}
    ]

    await reverseString(startArray, setArray, setLoader);
  })
})
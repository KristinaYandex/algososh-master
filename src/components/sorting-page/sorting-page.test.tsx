import { selectionSort, bubbleSort } from "./sorting-page";
import { ElementStates } from "../../types/element-states";

const setArray = jest.fn();

const arrayOfOneElement = [
  {state: 4, color: ElementStates.Default}
]
const finalArrayOfOneElement = [
  {state: 4, color: ElementStates.Modified}
]

const startArray = [
  {state: 4, color: ElementStates.Default},
  {state: 9, color: ElementStates.Default},
  {state: 1, color: ElementStates.Default},
  {state: 3, color: ElementStates.Default},
  {state: 8, color: ElementStates.Default}
]
  
const finalArrayAscending = [
  {state: 1, color: ElementStates.Modified},
  {state: 3, color: ElementStates.Modified},
  {state: 4, color: ElementStates.Modified},
  {state: 8, color: ElementStates.Modified},
  {state: 9, color: ElementStates.Modified}

]

const finalArrayDescending = [
  {state: 9, color: ElementStates.Modified},
  {state: 8, color: ElementStates.Modified},
  {state: 4, color: ElementStates.Modified},
  {state: 3, color: ElementStates.Modified},
  {state: 1, color: ElementStates.Modified}
]

describe('Тестирование алгоритма сортировки массива выбором по возрастанию', () => {
  it('Сортировка выбором: корректно сортирует пустой массив (по возрастанию)', async () => {

    await selectionSort([], 1000, setArray, "asc");
  })

  it('Сортировка выбором: корректно сортирует массив из одного элемента (по возрастанию)', async () => {

    await selectionSort(arrayOfOneElement, 1000, setArray, "asc");
    expect(setArray).toHaveBeenLastCalledWith(finalArrayOfOneElement);
  })

  it('Сортировка выбором: корректно сортирует массив из нескольких элементов (по возрастанию)', async () => {

    await selectionSort(startArray, 0, setArray, "asc");
    expect(setArray).toHaveBeenLastCalledWith(finalArrayAscending);
  })
})

describe('Тестирование алгоритма сортировки массива выбором по убыванию', () => {
  it('Сортировка выбором: корректно сортирует пустой массив (по убыванию)', async () => {

    await selectionSort([], 1000, setArray, "desc");
  })

  it('Сортировка выбором: корректно сортирует массив из одного элемента (по убыванию)', async () => {

    await selectionSort(arrayOfOneElement, 1000, setArray, "desc");
    expect(setArray).toHaveBeenLastCalledWith(finalArrayOfOneElement);
  })

  it('Сортировка выбором: корректно сортирует массив из нескольких элементов (по убыванию)', async () => {
 
    await selectionSort(startArray, 0, setArray, "desc");
    expect(setArray).toHaveBeenLastCalledWith(finalArrayDescending);
  })
})



describe('Тестирование алгоритма сортировки массива пузырьком по возрастанию', () => {
  it('Сортировка пузырьком: корректно сортирует пустой массив (по возрастанию)', async () => {

    await bubbleSort([], 1000, setArray, "asc");
  })

  it('Сортировка пузырьком: корректно сортирует массив из одного элемента (по возрастанию)', async () => {

    await bubbleSort(arrayOfOneElement, 1000, setArray, "asc");
    expect(setArray).toHaveBeenLastCalledWith(finalArrayOfOneElement);
  })

  it('Сортировка пузырьком: корректно сортирует массив из нескольких элементов (по возрастанию)', async () => {

    await bubbleSort(startArray, 0, setArray, "asc");
    expect(setArray).toHaveBeenLastCalledWith(finalArrayAscending);
  })
})

describe('Тестирование алгоритма сортировки массива пузырьком по убыванию', () => {
  it('Сортировка пузырьком: корректно сортирует пустой массив (по убыванию)', async () => {

    await bubbleSort([], 1000, setArray, "desc");
  })

  it('Сортировка пузырьком: корректно сортирует массив из одного элемента (по убыванию)', async () => {

    await bubbleSort(arrayOfOneElement, 1000, setArray, "desc");
    expect(setArray).toHaveBeenLastCalledWith(finalArrayOfOneElement);
  })

  it('Сортировка пузырьком: корректно сортирует массив из нескольких элементов (по убыванию)', async () => {

    await bubbleSort(startArray, 0, setArray, "desc");
    expect(setArray).toHaveBeenLastCalledWith(finalArrayDescending);
  })
})
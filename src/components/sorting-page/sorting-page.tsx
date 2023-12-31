import React, {useState} from "react";
import { swap } from "../utils";
import { loading } from "../utils";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import Styles from "./sorting-page.module.css";

type TArray = {
  state: number;
  color: ElementStates;
}

export const SortingPage: React.FC = () => {

  function getRandomIntegr(min: number, max: number) {
    const randomLength = Math.random() * (max - min + 1) + min;
    return Math.floor(randomLength);
  }

  function randomArr(): TArray[] {
    let arr: TArray[] = [];
    const length = getRandomIntegr(3, 17);
    for (let i = 0; i < length; i++) {
      arr.push({state: Math.floor(Math.random() * 100), color: ElementStates.Default})
    }
    return arr;
  }

  function changeMassiv() {
    setArrayNumber(randomArr())
  }

  const [sortingMethod, setSortingMethod] = useState<'selectionSort' | 'bubbleSort'>('selectionSort');
  const [arrayNumber, setArrayNumber] = useState<TArray[]>(randomArr());
  const [loader, setLoader] = useState(false);

  const selectionSort = async (arr: TArray[], sortingDirection: 'asc' | 'desc') => {
    for (let i = 0; i < arr.length; i++) {
      let maxIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setArrayNumber([...arr]);
        await loading(1000)
        if (sortingDirection === 'asc') {
          if (arr[j].state < arr[maxIndex].state) {
            maxIndex = j;
            swap(arr, j, maxIndex);
            setArrayNumber([...arr]);
          }
        }
        if (sortingDirection === 'desc') {
          if (arr[j].state > arr[maxIndex].state) {
            maxIndex = j;
            swap(arr, j, maxIndex);
            setArrayNumber([...arr]);
          }
        }
        arr[j].color = ElementStates.Default;
        arr[i].color = ElementStates.Default;
        setArrayNumber([...arr]);
      }
      arr[maxIndex].color = ElementStates.Modified;
      swap(arr, i, maxIndex);
      setArrayNumber([...arr]);
    }
  }

  const bubbleSort = async (arr: TArray[], sortingDirection: 'asc' | 'desc') => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].color = ElementStates.Changing;
        arr[j + 1].color = ElementStates.Changing;
        setArrayNumber([...arr]);
        await loading(1000)
        if (sortingDirection === 'asc') {
          if (arr[j].state > arr[j + 1].state) {
            swap(arr, j, j + 1);
          }
        }
        if (sortingDirection === 'desc') {
          if (arr[j].state < arr[j + 1].state) {
            swap(arr, j, j + 1);
          }
        }
        arr[j].color = ElementStates.Default;
        arr[j + 1].color = ElementStates.Default;
        setArrayNumber([...arr]);
      }
      arr[arr.length -i - 1].color = ElementStates.Modified;
      setArrayNumber([...arr]);
    }
    setArrayNumber([...arr]);
  }

  function ascendingSort() {
    setLoader(true);
    if (sortingMethod === 'selectionSort') {
      selectionSort(arrayNumber, 'asc')
    }
    if (sortingMethod === 'bubbleSort') {
      bubbleSort(arrayNumber, 'asc')
    }
    setLoader(false);
  }
  
  function descendingSort() {
    setLoader(true);
    if (sortingMethod === 'selectionSort') {
      selectionSort(arrayNumber, 'desc')
    }
    if (sortingMethod === 'bubbleSort') {
      bubbleSort(arrayNumber, 'desc')
    }
    setLoader(false);
  }

  return (
    <SolutionLayout title='Сортировка массива'>
      <div className={Styles.form}> 
        <div className={Styles.radioinput}>
          <RadioInput 
            label='Выбор' 
            onChange={() => setSortingMethod('selectionSort')} 
            checked={sortingMethod === 'selectionSort'} 
            disabled={loader}
          />
          <RadioInput 
            label='Пузырёк' 
            onChange={() => setSortingMethod('bubbleSort')} 
            checked={sortingMethod === 'bubbleSort'} 
            disabled={loader}
          />
        </div>
        <div className={Styles.buttons}>
          <Button type="button" text="По возрастанию" onClick={ascendingSort} sorting={Direction.Ascending} isLoader={loader}></Button>
          <Button type="button" text="По убыванию" onClick={descendingSort} sorting={Direction.Descending} isLoader={loader}></Button>
          <Button extraClass={Styles.button} linkedList="small" type="button" text="Новый массив" onClick={changeMassiv} isLoader={loader}></Button>
        </div>
      </div>
      <ul className={Styles.list}>
        {arrayNumber && arrayNumber.map((item, index) => (
          <li key={index}>
            <Column index={item.state} state={item.color}/>
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
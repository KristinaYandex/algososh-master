import React, { ChangeEvent, useState } from "react";
import { loading} from "../utils";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import Styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number | string>("");
  const [arrayNumber, setArrayNumber] = useState<Array<number>>();
  const [loader, setLoader] = useState(false);

  const fibIterative = (n: number): number[] => {
    let arr: number[] = [1, 1];
    for (let i = 2; i < n + 1; i++){
      arr.push(arr[i - 2] + arr[i -1])
    }
    return arr;
  } 

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const changeVisibleArray = async () => {
    setLoader(true);
    const array = fibIterative(Number(inputValue));
    for (let i = 0; i <= array.length; i++) {
      await loading(500);
      setArrayNumber(array.slice(0, i + 1));
    }
    setLoader(false);
  }
  
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div>
        <form className={Styles.form}>
          <Input extraClass={Styles.input} placeholder="Введите текст" value={inputValue} maxLength={19} onChange={onChange}></Input>
          <Button linkedList="small" type="submit" onClick={changeVisibleArray} text="Рассчитать" disabled={inputValue! >= 1 && inputValue! <= 19 ? false : true } isLoader={loader}></Button>
        </form>
        <p className={Styles.text}>Максимальное число - 19</p>
      </div>
      <div className={Styles.list}>
        {arrayNumber && arrayNumber.map((item, index) => {
          return <Circle key={index} index={index} letter={item.toString()} />
        })}
      </div>
    </SolutionLayout>
  );
};

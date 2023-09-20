import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { loading, swap } from "../utils";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import Styles from "./string.module.css";

type TArray = {
  value: string;
  color: ElementStates;
}

export const reverseString = async (arr: TArray[], setArraySrting: Dispatch<SetStateAction<TArray[]>>, setLoader: Dispatch<SetStateAction<boolean>>) => {
  setLoader(true);
  const mid = Math.ceil(arr.length / 2);

  for (let firstIndex = 0; firstIndex < mid; firstIndex++) {
    let secondIndex = arr.length - 1 - firstIndex;

    if (firstIndex !== secondIndex) {
      arr[firstIndex].color = ElementStates.Changing;
      arr[secondIndex].color = ElementStates.Changing;
      setArraySrting([...arr]);
      await loading(1000);
    }
    swap(arr, firstIndex, secondIndex);
    arr[firstIndex].color = ElementStates.Modified;
    arr[secondIndex].color = ElementStates.Modified;
    setArraySrting([...arr]);
  }
  setLoader(false);
}

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [arraySrting, setArraySrting] = useState<Array<TArray>>([]);
  const [loader, setLoader] = useState(false);

  const submit = () => {
    const reverseArray = inputValue.split("").map((inputVal) => {
      return { value: inputVal, color: ElementStates.Default}
    })
    reverseString(reverseArray, setArraySrting, setLoader)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }

  return (
    <SolutionLayout title="Строка">
      <div>
        <div className={Styles.form}>
          <Input extraClass={Styles.input} placeholder="Введите текст" value={inputValue} maxLength={11} onChange={onChange}></Input>
          <Button linkedList="small" type="submit" onClick={submit} text="Развернуть" disabled={inputValue === ""} isLoader={loader}></Button>
        </div>
        <p className={Styles.text}>Максимум - 11 символов</p>
      </div>
      <div className={Styles.list}>
        {arraySrting && arraySrting.map((item, index) => {
          return <Circle key={index} letter={item.value} state={item.color} />
        })}
      </div>
    </SolutionLayout>
  );
}
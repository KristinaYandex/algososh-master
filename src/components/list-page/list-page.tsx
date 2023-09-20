import React, {ChangeEvent, useState} from "react";
import { loading } from "../utils";
import { ElementStates } from "../../types/element-states";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { TListItem } from "../../types/list-item";
import { LinkedList } from "./utils";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import Styles from "./list-page.module.css";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<number | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [isloadAddInHead, setIsloadAddInHead] = useState<boolean>(false);
  const [isloadAddInTail, setIsloadAddInTail] = useState<boolean>(false);
  const [isloadAddIndex, setIsloadAddIndex] = useState<boolean>(false);
  const [isloadDeleteFromHead, setIsloadDeleteFromHead] = useState<boolean>(false);
  const [isloadDeleteFromTail, setIsloadDeleteFromTail] = useState<boolean>(false);
  const [isloadDeleteIndex, setIsloadDeleteIndex] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [array, setArray] = useState<TListItem[]>([
    {value: "0", color: ElementStates.Default},
    {value: "34", color: ElementStates.Default},
    {value: "8", color: ElementStates.Default},
    {value: "1", color: ElementStates.Default}
  ]);

  const list = new LinkedList<string>([])

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  
  const onChangeInputIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(Number(e.target.value));
  }

  //Добавляем в начало списка
  const addToHead = async () => {
    setIsDisabled(true);
    setIsloadAddInTail(true);
    setLoader(true);
    //Добавляем в начало списка
    list.prepend(inputValue);
    //Добавляем верхний кружок
    array[0] = {
      ...array[0], 
      topCircle: true, 
      smallCircle: {
        value: inputValue, 
        color: ElementStates.Changing
      }
    }
    setArray([...array])
    await loading(500)
    //Удаляем кружок, добавляем элемент в начало массива
    array[0] = {
      ...array[0], 
      topCircle: false
    }
    array.unshift({
      value: inputValue, 
      color: ElementStates.Modified
    })
    setArray([...array])
    await loading(500);
    array[0] = {
      ...array[0], 
      color: ElementStates.Default
    }
    setArray([...array])
    await loading(500);
    setInputValue("");
    setIsloadAddInTail(false);
    setLoader(false);
    setIsDisabled(false);
  }


  //Добавляем в конец списка
  const addToTail = async () => {
    setIsDisabled(true);
    setIsloadAddInHead(true);
    setLoader(true);
    //Добавляем в начало списка
    list.append(inputValue);
    //Добавляем верхний кружок
    array[array.length - 1] = {
      ...array[array.length - 1], 
      topCircle: true, 
      smallCircle: {
        value: inputValue, 
        color: ElementStates.Changing
      }
    }
    setArray([...array])
    await loading(500)
    //Удаляем кружок, добавляем элемент в начало массива
    array[array.length - 1] = {
      ...array[array.length - 1], 
      topCircle: false
    }
    array.push({
      value: inputValue, 
      color: ElementStates.Modified
    })
    setArray([...array])
    await loading(500);
    array[array.length - 1] = {
      ...array[array.length - 1], 
      color: ElementStates.Default
    }
    setArray([...array])
    await loading(500);
    setInputValue("");
    setIsloadAddInHead(false);
    setLoader(false);
    setIsDisabled(false);
  }


  //Удаляем из начала списка
  const deleteFromHead = async () => {
    setIsDisabled(true);
    setIsloadDeleteFromHead(true);
    setLoader(true);
    list.deleteHead();
    array[0] = {
      ...array[0], 
      value: "",
      bottCircle: true, 
      smallCircle: {
        value: array[0].value, 
        color: ElementStates.Changing
      }
    }
    setArray([...array])
    await loading(500)

    array[0] = {
      ...array[0], 
      topCircle: false
    }
    array.shift();
    setArray([...array])

    setIsloadDeleteFromHead(false);
    setLoader(false);
    setIsDisabled(false);
  }


  //Удаляем из конца списка
  const deleteFromTail = async () => {
    setIsDisabled(true);
    setIsloadDeleteFromTail(true);
    setLoader(true);
    list.deleteTail();

    array[array.length - 1] = {
      ...array[array.length - 1], 
      value: "",
      bottCircle: true, 
      smallCircle: {
        value: array[array.length - 1].value, 
        color: ElementStates.Changing
      }
    }
    setArray([...array])
    await loading(500)

    array[array.length - 1] = {
      ...array[array.length - 1], 
      topCircle: false
    }
    array.pop();
    setArray([...array])

    setIsloadDeleteFromTail(false);
    setLoader(false);
    setIsDisabled(false);
  }


  //Добавляем элемент по индексу
  const addByIndex = async () => {
    setIsDisabled(true);
    setIsloadAddIndex(true);
    setLoader(true);
    if (inputIndex) {
      list.insertAt(inputValue, inputIndex)
    
      //Добавляем верхний кружок первому элементу 
      array[0] = {
        ...array[0], 
        topCircle: true, 
        smallCircle: {
          value: inputValue, 
          color: ElementStates.Changing
        }
      }
      setArray([...array])
      await loading(500)
      //проходим по всем элементам до нужного индекса, менем цвет предыдущим элементам
      for(let i = 1; i <= inputIndex; i++) {
        array[i] = {
          ...array[i], 
          topCircle: true, 
          smallCircle: {
            value: inputValue, 
            color: ElementStates.Changing
          }
        }
        array[i-1] = {
          ...array[i-1], 
          topCircle: false, 
          arrow: true,
          color: ElementStates.Changing
        }
        setArray([...array])
        await loading(500);
      }
      //Добавляем элемент в нужное место массива
      array[inputIndex] = {
        ...array[inputIndex], 
        topCircle: false
      }
      array.splice(inputIndex, 0, {
        value: inputValue, 
        color: ElementStates.Modified
      })
      setArray([...array])
      await loading(500);
      //Удаляем стрелки и меняем цвета кружков
      array.map((element) => {
        return (
          element.color = ElementStates.Default, 
          element.arrow = false
        )
      })
      setArray([...array])
      await loading(500);
      setInputValue("");
      setInputIndex(null);
    }
    setIsloadAddIndex(false);
    setLoader(false);
    setIsDisabled(false);
  }


  //Удаляем элемент по индексу
  const deleteByIndex = async () => {
    setIsDisabled(true);
    setIsloadDeleteIndex(true);
    setLoader(true);
    if (inputIndex) {
      list.extractAt(inputIndex)
    
      //проходим по всем элементам до нужного индекса, менем цвет перебранным элементам
      for(let i = 0; i <= inputIndex; i++) {
        array[i] = {
          ...array[i], 
          color: ElementStates.Default, 
          arrow: false
        }
        setArray([...array])
        await loading(500);
      }
        //Удаляем значение из большого круга, показываем его в маленьком кружочке
        array[inputIndex] = {
          ...array[inputIndex],
          value: "",
          bottCircle: true, 
          color: ElementStates.Changing,
          arrow: false,
          smallCircle: {
            value: array[inputIndex].value, 
            color: ElementStates.Changing
          }
        }
        setArray([...array])
        await loading(500);

        array.splice(inputIndex, 1)
        //Удаляем стрелки и меняем цвета кружков
        array.map((element) => {
          return (
            element.color = ElementStates.Default, 
            element.arrow = false
          )
        })
        setArray([...array])
        await loading(500);
        setInputIndex(null);
    }
    setIsloadDeleteIndex(false);
    setLoader(false);
    setIsDisabled(false);
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={Styles.form}>
        <div className={Styles.container}>
          <Input extraClass={Styles.input} placeholder="Введите значение" value={inputValue} maxLength={4} onChange={onChangeInput}></Input>
          <Button type="button" linkedList="small" text="Добавить в head" onClick={addToHead} disabled={inputValue === "" || isDisabled} isLoader={isloadAddInHead}></Button>
          <Button type="button" linkedList="small" text="Добавить в tail" onClick={addToTail} disabled={inputValue === "" || isDisabled} isLoader={isloadAddInTail}></Button>
          <Button type="button" linkedList="small" text="Удалить из head" onClick={deleteFromHead} disabled={!array.length || isDisabled} isLoader={isloadDeleteFromHead}></Button>
          <Button type="button" linkedList="small" text="Удалить из tail" onClick={deleteFromTail} disabled={!array.length || isDisabled} isLoader={isloadDeleteFromTail}></Button>
        </div>
        <p className={Styles.text}>Максимум - 4 символа</p>
        <div className={Styles.container}>
          <Input extraClass={Styles.input} placeholder="Введите значение" value={inputIndex? inputIndex : ""} maxLength={array.length - 1} onChange={onChangeInputIndex}></Input>
          <Button type="button" linkedList="big" text="Добавить по индексу" onClick={addByIndex} disabled={inputValue === "" || isDisabled} isLoader={isloadAddIndex}></Button>
          <Button type="button" linkedList="big" text="Удалить по индексу" onClick={deleteByIndex} disabled={!array.length || isDisabled} isLoader={isloadDeleteIndex}></Button>
        </div>
      </form>
      <ul className={Styles.list}>
        {array && array.map((item, index) => (
          <li className={Styles.circle} key={index}>
            <li>
              <Circle 
                index={index}
                letter={item.value} 
                state={item.color} 
                head={(index === 0) && !item.topCircle ? "head" : ""}
                tail={(index === array.length - 1) && !item.bottCircle ? "tail" : ""}
              />
              {item.topCircle && 
                <Circle 
                  letter={item.smallCircle?.value} 
                  state={item.smallCircle?.color} 
                  isSmall={true}
                  extraClass={Styles.topCircle}
                />
              }
              {item.bottCircle && 
                <Circle 
                  letter={item.smallCircle?.value} 
                  state={item.smallCircle?.color} 
                  isSmall={true}
                  extraClass={Styles.bottCircle}
                />
              }
            </li>
            {array.length - 1 !== index &&
              <ArrowIcon fill={item.color === ElementStates.Changing ? "#D252E1" : undefined}/>
            }
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
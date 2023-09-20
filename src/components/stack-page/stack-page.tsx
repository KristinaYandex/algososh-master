import React, {ChangeEvent, useState, useMemo} from "react";
import { loading } from "../utils";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./utils";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import Styles from "./stack-page.module.css";

type TElement = {
  value: string,
  color: ElementStates
}

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [container, setContainer] = useState<TElement[]>([]);
  const [loader, setLoader] = useState(false);

  const stack = useMemo(() => {
    return new Stack<TElement>()
  }, [])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }

  const pushElement = async () => {
    if (inputValue) {
      setLoader(true);
      stack.push({value: inputValue, color: ElementStates.Changing});
      setContainer([...stack.getContent()]);
      setInputValue("")
      await loading(500);
      stack.peak()!.color = ElementStates.Default;
      setContainer([...stack.getContent()]);
      setLoader(false);
    }
  }

  const deleteElement = async () => {
    setLoader(true);
    stack.peak()!.color = ElementStates.Changing;
    setContainer([...stack.getContent()]);
    stack.pop();
    await loading(500);
    setContainer([...stack.getContent()]);
    setLoader(false);
  }

  const clearStack = () => {
    if (container.length) {
      stack.clear();
      setContainer([...stack.getContent()]);
    }
  }

  const getTop = (arr: TElement[], index: number) => {
    if (arr.length - 1 === index) {
      return "top";
    } else {
      return "";
    }
  }

  return (
    <SolutionLayout title="Стек">
      <form className={Styles.form}>
        <Input extraClass={Styles.input} placeholder="Введите текст" value={inputValue} maxLength={4} onChange={onChange}></Input>
        <Button linkedList="small" type="submit" text="Добавить" onClick={pushElement} disabled={inputValue === ""} isLoader={loader}></Button>
        <Button linkedList="small" type="button" text="Удалить" onClick={deleteElement} disabled={container.length ? false : true} isLoader={loader}></Button>
        <Button extraClass={Styles.button} linkedList="small" type="reset" text="Очистить" onClick={clearStack} disabled={container.length ? false : true} isLoader={loader}></Button>
      </form>
      <p className={Styles.text}>Максимум - 4 символа</p>
      <ul className={Styles.list}>
        {container && container.map((item, index) => (
          <li key={index}>
            <Circle letter={item.value} state={item.color} index={index} head={getTop(container, index)}/>
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};

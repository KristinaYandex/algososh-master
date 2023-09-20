import React, {ChangeEvent, useState, useMemo} from "react";
import { loading } from "../utils";
import { ElementStates } from "../../types/element-states";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./utils";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import Styles from "./queue-page.module.css";

type TElement = {
  value: string,
  color: ElementStates
}

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [container, setContainer] = useState<(TElement| null)[]>(Array(7).fill({value: '', color: ElementStates.Default}));
  const [loader, setLoader] = useState(false);

  const queue =  useMemo(() => {
    return new Queue<TElement>(7);
  },[]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }

  const pushElement = async () => {
    if (inputValue) {
      setLoader(true);
      queue.enqueue({value: inputValue, color: ElementStates.Default});
      container[queue.getTail() - 1] = { value: inputValue, color: ElementStates.Changing };
      setContainer([...container]);
      setInputValue("")
      await loading(500);
      container[queue.getTail() - 1] = { value: inputValue, color: ElementStates.Default };
      setContainer([...container]);
      setLoader(false);
    }
  }

  const deleteElement = async () => {
    setLoader(true);
    container[queue.getHead()] = {value: "", color: ElementStates.Changing};
    setContainer([...container]);
    queue.dequeue();
    await loading(500)
    container[queue.getHead() - 1] = {value: "", color: ElementStates.Default};
    setContainer([...container]);
    setLoader(false);
  }
  
  const clearQueue = () => {
    if (container.length) {
      queue.clear();
      setContainer(Array(7).fill({value: '', color: ElementStates.Default}));
    }
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={Styles.form}>
        <Input extraClass={Styles.input} placeholder="Введите текст" value={inputValue} maxLength={4} onChange={onChange}></Input>
        <Button type="submit" linkedList="small" text="Добавить" onClick={pushElement} disabled={inputValue === "" || queue.isFullQueue()} isLoader={loader}></Button>
        <Button type="button" linkedList="small" text="Удалить" onClick={deleteElement} disabled={container.length ? false : true} isLoader={loader}></Button>
        <Button extraClass={Styles.button} type="reset" linkedList="small" text="Очистить" onClick={clearQueue} disabled={container.length ? false : true} isLoader={loader}></Button>
      </form>
      <p className={Styles.text}>Максимум - 4 символа</p>
      <ul className={Styles.list}>
        {container && container.map((item, index) => (
          <li key={index}>
            <Circle 
              letter={item ? item.value : ""} 
              state={item ? item.color : ElementStates.Default} 
              index={index} 
              head={index === queue.getHead() && !queue.isEmpty() ? "head" : ""}
              tail={index === queue.getTail() - 1 && !queue.isEmpty() ? "tail" : ""}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
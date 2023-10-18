import { useState, SyntheticEvent} from "react";

/*export function useForm<T>(inputValues: T) {
  const [inputValue, setInputValue] = useState(inputValues);

  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const {value, name} = event.target as HTMLInputElement;
    setInputValue({...inputValue, [name]: value});
  };
  return {inputValue, handleChange, setInputValue};
} */

export function useForm<T>(inputValues:T) {
  const [inputValue, setInputValue] = useState<T>(inputValues);

  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const {value, name} = event.target as HTMLInputElement;
    setInputValue({...inputValue, [name]: value});
  };
  return {inputValue, handleChange, setInputValue};
}
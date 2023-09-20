export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getHead: () => number;
  getTail: () => number;
  clear: () => void;
  getContent: () => (T | null)[];
  isFullQueue: () => boolean;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  //Указатель на начало очереди
  private head = 0;
  //Указатель на конец очереди
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    //Максимально допустимый размер очереди
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head % this.size] = null;
    this.head++;
    this.length--;
  };


  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head % this.size]
  };

  getHead = ():number => {
    return this.head
  }

  getTail = ():number => {
    return this.tail
  }
  
  clear = () => {
    this.container = [];
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  isEmpty = () => this.length === 0;

  getContent = () => this.container;

  isFullQueue = (): boolean => {
    return this.tail === this.size;
  };
}
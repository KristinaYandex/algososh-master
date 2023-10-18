export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next: Node<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

export interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  insertAt: (element: T, index: number) => void;
  extractAt: (index: number) => void;
  getSize: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  constructor(elements: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    elements.forEach(element => this.append(element))
  }

  append(element: T) {
    let newNode = new Node(element);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    } 
    this.tail.next = newNode;
    this.tail = newNode;
    this.size++;
  }

  prepend(element: T) {
    let newNode = new Node(element);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    } 
    this.head = newNode;
    this.head.next = this.head;
    this.size++;
  }

  deleteHead() {
    if (!this.head) {
      return null
    }
    const deleteThisHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.size--;
    return deleteThisHead;
  }

  deleteTail() {
    if (!this.tail) {
      return null
    }
    const deleteThisTail = this.tail;

    if (this.tail.next) {
      this.tail = this.tail.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.size--;
    return deleteThisTail;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);
      // добавить элемент в начало списка
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        // перебрать элементы в списке до нужной позиции
        while(currIndex+1 < index && curr !== null) {
          curr = curr.next;
          currIndex++
        }
        if (curr !== null && curr.next !== null) {
          node.next = curr.next
          curr.next = node 
        }
      }
      this.size++;
    }
  }

  extractAt(index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      if (index === 0) {
        this.deleteHead();
        return;
      } else if (index === -1 || index === this.size - 1) {
        this.deleteTail();
        return;
      }
      let current = this.head;
      let prevNode = null;
      let nextNode = null;
      let currentIndex = 0;
      // перебрать элементы в списке до нужной позиции
      while(currentIndex + 1 < index && current !== null && current.next !== null) {
        prevNode = current;
        current = current.next;
        nextNode = current.next;
        currentIndex++;
      }
      if (prevNode !== null && prevNode.next !== null) {
          prevNode.next = nextNode; 
      }
      this.size--;
    }
  }

  getSize() {
    return this.size;
  }

}

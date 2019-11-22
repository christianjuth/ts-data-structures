/**
 * A data structure to store a collection of objects.
 *
 * @summary stack
 * @author Christian Juth
 *
 * Created at     : 2019-11-22 00:30:19 
 * Last modified  : 2019-11-22 00:38:40
 */


/**
 * A data structure to store a collection of objects.
 * 
 * @typeparam T - Type of value contained in the stack
 */
class Stack<T>{
  private front: Node<T> | null;

  /**
   * Create a new stack.
   */
  constructor() {
    this.front = null;
  }

  /**
   * Add value to the stack.
   *
   * @param value - value to enqueue
   */
  push(value: T): void {
    this.front = new Node({
      value,
      next: this.front
    });
  }

  /** 
   * Peak at the first node in queue, if it exists
   *
   * @return first value in list, if it exists
   */
  peak(): T | null{
    if(this.front === null) return null;
    return this.front.value;
  }

  /**
   * Remove value from the stack.
   *
   * @param value - value that was removed
   */
  pop(): T | null{
    if(this.front === null) return null;
    const output = this.front.value;
    this.front = this.front.next;
    return output;
  }

  /**
   * Check if the stack is empty
   *
   * @return true if the stack is empty
   */
  isEmpty(): boolean {
    return this.front === null;
  }

  /**
   * String representation of the stack
   *
   * @return string representing the stack
   */
  toString(): String {
    let output = '';
    for(let n = this.front; n; n = n.next) {
      output += (n.value + (n.next ? ', ' : ''));
    }
    return `(${output})`;
  }
  
  /**
   * Print string representation of the stack to the console
   */
  traverse(): void {
    console.log(this.toString());
  }
}


interface Node<T> {
  value: T;
  next: Node<T> | null;
}

class Node<T> implements Node<T>{
  constructor({ value, next }: { value: T, next?: Node<T> | null }) {
    this.value = value;
    // turn undefined into null
    this.next = next || null;
  }
}


export default Stack;
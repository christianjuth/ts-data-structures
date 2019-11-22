/**
 * A data structure to store a collection of objects.
 *
 * @summary queue
 * @author Christian Juth
 *
 * Created at     : 2019-11-21 23:37:56 
 * Last modified  : 2019-11-22 00:38:39
 */


/**
 * A data structure to store a collection of objects.
 * 
 * @typeparam T - Type of value contained in the queue
 */
class Queue<T>{
  private front: Node<T> | null;
  private back: Node<T> | null;

  /**
   * Create a new queue.
   */
  constructor() {
    this.front = null;
    this.back = null;
  }

  /**
   * Add value to the queue.
   *
   * @param value - value to enqueue
   */
  enqueue(value: T): void {
    let node = new Node({ value });
    if(this.front === null) {
      this.back = node;
    } else {
      this.front.prev = node;
    }
    this.front = node;
  }

  /**
   * First node in queue, if it exists
   *
   * @return first value in list, if it exists
   */
  first(): T | null{
    if(this.back === null) return null;
    return this.back.value;
  }

  /**
   * Remove value from the queue.
   *
   * @return value that was dequeued
   */
  dequeue(): T | null{
    if(this.back === null) return null;
    const output = this.back.value;
    this.back = this.back.prev;
    return output;
  }

  /**
   * Check if the queue is empty
   *
   * @return true if the queue is empty
   */
  isEmpty(): boolean {
    return this.front === null;
  }

  /**
   * String representation of queue
   *
   * @return string representing queue
   */
  toString(): String {
    let output = '';
    for(let n = this.back; n; n = n.prev) {
      output += (n.value + (n.prev ? ', ' : ''));
    }
    return `(${output})`;
  }
  
  /**
   * Print string representation of queue to the console
   */
  traverse(): void {
    console.log(this.toString());
  }
}


interface Node<T> {
  value: T;
  prev: Node<T> | null;
}

class Node<T> implements Node<T>{
  constructor({ value, prev }: { value: T, prev?: Node<T> | null }) {
    this.value = value;
    // turn undefined into null
    this.prev = prev || null;
  }
}


export default Queue;
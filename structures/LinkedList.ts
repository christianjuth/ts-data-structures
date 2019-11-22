/**
 * A linear data structure where each element is a separate object.
 *
 * @summary doubly linked list
 * @author Christian Juth
 *
 * Created at     : 2019-11-21 13:17:06 
 * Last modified  : 2019-11-22 00:42:07
 */


/**
 * A linear data structure where each element is a separate object.
 * 
 * @typeparam T - Type of value contained in the list
 */
class LinkedList<T>{
  private front: Node<T> | null;
  private back: Node<T> | null;

  /**
   * Create a new linked list.
   */
  constructor() {
    this.front = null;
    this.back = null;
  }
  
  /**
   * Add value to the beginning of the list.
   *
   * @param value - value to be added
   */
  shift(value: any): void {
    const node = new Node<T>({ 
      value,
      prev: this.front
    });
    if(this.front !== null) {
      this.front.next = node;
    } else {
      this.back = node;
    }
    this.front = node;
  }

  /**
   * Remove node from the beginning of the list.
   *
   * @return value that was removed, if any
   */
  unshift(): T | undefined {
    if(!this.front) return;
    const output = this.front.value;
    this.front = this.front.prev;
    if(this.front !== null) {
      this.front.next = null;
    } else {
      this.back = null;
    }
    return output;
  }

  /**
   * Add value to the end of the list.
   *
   * @param value - value to be added
   */
  push(value: T): void {
    const node = new Node<T>({ 
      value,
      next: this.back
    });
    if(this.back !== null) {
      this.back.prev = node;
    } else {
      this.front = node;
    }
    this.back = node;
  }

  /**
   * Remove node from the end of the list.
   *
   * @return value that was removed, if any
   */
  pop(): T | undefined {
    if(!this.back) return;
    const output = this.back.value;
    this.back = this.back.next;
    if(this.back !== null) {
      this.back.prev = null;
    } else {
      this.front = null;
    }
    return output;
  }

  /**
   * Remove first occurrence of value from the list.
   *
   * @param value - value to remove
   * @return true if a node was removed
   */
  remove(value: T): boolean {
    for(let crnt = this.front; crnt; crnt = crnt.prev) {
      if(crnt.value === value) {
        // front
        if(crnt.next === null) {
          this.front = crnt.prev;
          if(this.front) this.front.next = null;
        } 
        // back
        else if(crnt.prev === null) {
          this.back = crnt.next;
          if(this.back) this.back.prev = null;
        } 
        // middle
        else {
          let prev = crnt.prev,
            next = crnt.next;
          prev.next = next;
          next.prev = prev;
        }
        return true;
      }
    }
    return false;
  }

  /**
   * Remove all occurrences of a value from the list.
   *
   * @param value - value to remove
   * @return true if at least one node was removed
   */
  removeAll(value: T): boolean {
    let output = false;
    for(let crnt = this.front; crnt; crnt = crnt.prev) {
      if(crnt.value === value) {
        // front
        if(crnt.next === null) {
          this.front = crnt.prev;
          if(this.front) this.front.next = null;
        } 
        // back
        else if(crnt.prev === null) {
          this.back = crnt.next;
          if(this.back) this.back.prev = null;
        } 
        // middle
        else {
          let prev = crnt.prev,
            next = crnt.next;
          prev.next = next;
          next.prev = prev;
        }
        output = true;
      }
    }
    return output;
  }

  /**
   * Get the value of the last node in the list
   *
   * @return last value in list, if it exists
   */
  last(): T | null {
    if(this.back) return this.back.value;
    return null;
  }

  /**
   * Get the value of the first node in the list
   *
   * @return first value in list, if it exists
   */
  first(): T | null {
    if(this.front) return this.front.value;
    return null;
  }

  /**
   * Check if value exists in the list
   *
   * @param value - Value to search for
   * @return true if linked list contains value
   */
  contains(value: T): boolean {
    for(let n = this.front; n; n = n.prev) {
      if(n.value === value) return true;
    }
    return false;
  }

  /**
   * Get the length of the list
   *
   * @return length of the list
   */
  length(): number {
    let i = 0;
    for(let crnt = this.front; crnt; crnt = crnt.prev) {
      i++;
    }
    return i;
  }

  /**
   * Check if list has any nodes
   *
   * @return true if list is empty
   */
  isEmpty() {
    return this.front === null;
  }

  /**
   * Iterate over each value in the list
   *
   * @param callback - functioned called for each value
   */
  forEach(callback: (value: T, index: number) => void): void {
    let i = 0;
    for(let n = this.front; n; n = n.prev) {
      callback(n.value, i);
      i++;
    }
  }

  /**
   * Iterate over list and map old values to new values based on callback
   *
   * @param callback - function to map old values to new values
   */
  map(callback: (value: T, index: number) => T): void {
    let i = 0;
    for(let n = this.front; n; n = n.prev) {
      n.value = callback(n.value, i);
      i++;
    }
  }

  /**
   * Get a string representation of the list
   *
   * @return string representing list
   */
  toString(): String {
    let output = '';
    for(let n = this.front; n; n = n.prev) {
      output += (n.value + (n.prev ? ', ' : ''));
    }
    return `(${output})`;
  }

  /**
   * Print string representation of list to the console
   */
  traverse(): void {
    console.log(this.toString());
  }
}


interface Node<T> {
  value: T;
  next: Node<T> | null;
  prev: Node<T> | null;
}

class Node<T> implements Node<T>{
  constructor({ value, next, prev }: { value: T, next?: Node<T> | null, prev?: Node<T> | null }) {
    this.value = value;
    // turn undefined into null
    this.next = next || null;
    this.prev = prev || null;
  }
}


export default LinkedList;
/**
 * LinkedList
 *
 * @summary doubly linked list
 * @author Christian Juth
 *
 * Created at     : 2019-11-21 13:17:06 
 * Last modified  : 2019-11-21 21:00:53
 */

 
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



interface LinkedList<T> {
  front: Node<T> | null,
  back: Node<T> | null
}

class LinkedList<T> implements LinkedList<T>{

  constructor() {
    this.front = null;
    this.back = null;
  }
  
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

  unshift(): T | undefined {
    if(!this.front) return;
    const output = this.front.value;
    this.front = this.front.prev;
    if(this.front !== null) {
      this.front.next = null;
    }
    return output;
  }

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

  pop(): T | undefined {
    if(!this.back) return;
    const output = this.back.value;
    this.back = this.back.next;
    if(this.back !== null) {
      this.back.prev = null;
    }
    return output;
  }

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

  last(): T | null {
    if(this.back) return this.back.value;
    return null;
  }

  first(): T | null {
    if(this.front) return this.front.value;
    return null;
  }

  length(): number {
    let i = 0;
    for(let crnt = this.front; crnt; crnt = crnt.prev) {
      i++;
    }
    return i;
  }

  forEach(callback: (item: T, index: number) => void): void {
    let i = 0;
    for(let n = this.front; n; n = n.prev) {
      callback(n.value, i);
      i++;
    }
  }

  contains(value: T): boolean {
    for(let n = this.front; n; n = n.prev) {
      if(n.value === value) return true;
    }
    return false;
  }

  map(callback: (item: T, index: number) => T): void {
    let i = 0;
    for(let n = this.front; n; n = n.prev) {
      n.value = callback(n.value, i);
      i++;
    }
  }

  toString(): String {
    let output = '';
    for(let n = this.front; n; n = n.prev) {
      output += (n.value + (n.prev ? ', ' : ''));
    }
    return `(${output})`;
  }

  traverse(): void {
    console.log(this.toString());
  }
}

export default LinkedList;
/**
 * A data structure which stores data in an associative manner.
 *
 * @summary hash table
 * @author Christian Juth
 *
 * Created at     : 2019-11-21 23:57:10 
 * Last modified  : 2019-11-22 00:47:22
 */


 /** THIS IS A HACK TO FIX DOCS */
import LinkedList from './LinkedList';


/**
 * A data structure which stores data in an associative manner.
 * 
 * @typeparam T - Type of value contained in the table
 */
class HashTable<T>{
  private maxLoad: number;
  private mod: number;
  private columns: Array<LinkedList<T>>;

  /**
   * Create a new hash table.
   *
   * @param options - hash table configuration
   */
  constructor(options?: { mod?: number, maxLoad?: number }) {
    let { maxLoad, mod } = Object.assign({
      maxLoad: 1,
      mod: 10
    }, options);
    this.mod = mod;
    this.maxLoad = maxLoad;
    this.columns = this.buildColumns();
  }

  private buildColumns(): Array<LinkedList<T>> {
    return new Array<LinkedList<T>>(this.mod);
  }

  private grow(min: number): void {
    console.log(min, this.mod + 1, Math.min(min, this.mod + 1));
    const oldColumns = this.columns;
    this.mod = Math.max(min, this.mod + 1);
    this.columns = this.buildColumns();
    oldColumns.forEach(col => {
      col.forEach(value => {
        this.add(value);
      });
    });
  }

  /**
   * Add value to the table.
   *
   * @param value - value to be added
   */
  add(value: T): boolean {
    if(this.contains(value)) return false;
    let index = this.id(value) % this.mod;
    if(!this.columns[index]) {
      this.columns[index] = new LinkedList<T>();
    }
    if(this.columns[index].length() > (this.maxLoad - 1)) {
      this.grow(index);
      this.add(value);
    } else {
      this.columns[index].push(value);
    }
    return true;
  }

  /**
   * Remove value from the table.
   *
   * @param value - value to be removed
   * @return true if value was remove
   */
  remove(value: T): boolean {
    if(!this.contains(value)) return false;
    let index = this.id(value) % this.mod;
    return this.columns[index].remove(value);
  }

  /**
   * Check if the table contains a value.
   *
   * @param value - value to search table for
   * @return true if table contains value
   */
  contains(value: T): boolean {
    let index = this.id(value) % this.mod;
    if(!this.columns[index]) {
      return false;
    } else{
      return this.columns[index].contains(value);
    }
  }

  /**
   * Iterate over each value in the table
   *
   * @param callback - functioned called for each value
   */
  forEach(callback: (item: T) => void): void {
    this.columns.forEach(col => {
      col.forEach(callback);
    });
  }

  /**
   * Check if the table is empty
   *
   * @return true if table is empty
   */
  isEmpty(): boolean {
    let output = true;
    this.forEach(() => {
      output = false;
    });
    return output;
  }

  /**
   * String representation of the table
   *
   * @return string representing the table
   */
  toString(): String {
    let output = '';
    this.columns.forEach((col, i) => {
      if(output.length > 0) output += '\n';
      output += `${i}) ${col.toString()}`;
    });
    return output;
  }

  /**
   * Print string representation of the table to the console
   */
  traverse(): void {
    console.log(this.toString());
  }

  private stringId(str: string): number {
    var hash = 0, i, chr, len;
    for (i = 0, len = str.length; i < len; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  private id(value: T): number {
    switch(typeof value) {
      case 'number':
        return value;
      case 'string':
        return this.stringId(value);
      default:
        throw new Error('failed to create id');
    }
  };
}

export default HashTable;
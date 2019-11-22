import LinkedList from './LinkedList';

interface HashTable<T> {
  columns: Array<LinkedList<T>>;
  maxLoad: number;
  mod: number;
}

class HashTable<T>{
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

  remove(value: T): boolean {
    if(!this.contains(value)) return false;
    let index = this.id(value) % this.mod;
    return this.columns[index].remove(value);
  }

  contains(value: T): boolean {
    let index = this.id(value) % this.mod;
    if(!this.columns[index]) {
      return false;
    } else{
      return this.columns[index].contains(value);
    }
  }

  forEach(callback: (item: T) => void): void {
    this.columns.forEach(col => {
      col.forEach(callback);
    });
  }

  toString(): String {
    let output = '';
    this.columns.forEach((col, i) => {
      if(output.length > 0) output += '\n';
      output += `${i}) ${col.toString()}`;
    });
    return output;
  }

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
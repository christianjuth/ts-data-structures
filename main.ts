import {
  LinkedList,
  HashTable
} from './structures';

console.clear();

let table = new HashTable<String>({
  maxLoad: 2
});

table.add('test');
table.add('yolo');
table.add('hey whats up');
table.add('how are you');
table.add('nope');
table.add('nope');
table.remove('nope');
// table.add(6);
// table.add(7);
// table.add(17);
// table.add(27);


table.traverse();

// console.log(table.contains('nope'));

// let list = new LinkedList<number>();

// list.push(2);
// list.push(3);
// list.push(4);
// list.remove(3);

// list.traverse();
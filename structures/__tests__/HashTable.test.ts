import HashTable from '../HashTable';


describe("HashTable", () => {

  test("add", () => {
    let table = new HashTable<number>();
    table.add(5);
    table.add(6);
    expect(table.toString()).toMatchSnapshot();
  });

  test("double add", () => {
    let table = new HashTable<String>();
    expect(table.add('bob')).toBe(true);
    expect(table.add('bob')).toBe(false);
    expect(table.toString()).toMatchSnapshot();
  });

  test("contains", () => {
    let table = new HashTable<String>();
    table.add('bob');
    expect(table.contains('bob')).toBe(true);
    expect(table.contains('mike')).toBe(false);
  });

  test("remove", () => {
    let table = new HashTable<number>();
    table.add(5);
    table.add(8);
    expect(table.toString()).toMatchSnapshot();
    expect(table.remove(10)).toBe(false);
    expect(table.remove(5)).toBe(true);
    expect(table.toString()).toMatchSnapshot();
  });

  test("forEach", () => {
    let list = new HashTable<number>({
      mod: 4
    });
    // use small number so the
    // order of forEach is predictable
    list.add(0);
    list.add(1);
    list.add(2);
    list.add(3);
    let baseline: number[] = [0, 1, 2, 3],
      i = 0;
    list.forEach(item => {
      expect(item).toBe(baseline[i]);
      i++;
    });
  });

  test("isEmpty", () => {
    let list = new HashTable<number>();
    expect(list.isEmpty()).toBe(true);
    list.add(0);
    expect(list.isEmpty()).toBe(false);
  });

});
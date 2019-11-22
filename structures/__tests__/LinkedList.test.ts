import LinkedList from '../LinkedList';


describe("LinkedList", () => {

  test("push", () => {
    let list = new LinkedList<number>();
    list.push(1);
    list.push(2);
    list.push(3);
    expect(list.length()).toBe(3);
    expect(list.toString()).toMatchSnapshot();
  });

  test("pop", () => {
    let list = new LinkedList<number>();
    list.push(1);
    list.push(2);
    list.push(3);
    expect(list.toString()).toMatchSnapshot();
    expect(list.length()).toBe(3);
    expect(list.pop()).toBe(3);
    expect(list.toString()).toMatchSnapshot();
    expect(list.length()).toBe(2);
  });

  test("shift", () => {
    let list = new LinkedList<number>();
    list.shift(3);
    list.shift(2);
    list.shift(1);
    expect(list.length()).toBe(3);
    expect(list.toString()).toMatchSnapshot();
  });

  test("unshift", () => {
    let list = new LinkedList<number>();
    list.shift(3);
    list.shift(2);
    list.shift(1);
    expect(list.toString()).toMatchSnapshot();
    expect(list.length()).toBe(3);
    expect(list.unshift()).toBe(1);
    expect(list.toString()).toMatchSnapshot();
    expect(list.length()).toBe(2);
  });

  test("forEach", () => {
    let list = new LinkedList<String>();
    list.push('2');
    list.push('3');
    list.push('4');
    list.shift('1');
    let baseline = ['1', '2', '3', '4'];
    list.forEach((item, i) => {
      expect(item).toMatch(baseline[i]);
    });
  });

  test("map", () => {
    let list = new LinkedList<number>();
    list.push(2);
    list.shift(1);
    list.push(3);
    list.map(value => {
      return value * 2
    });
    expect(list.toString()).toMatchSnapshot();
  });

  test("toString", () => {
    let list = new LinkedList<number>();
    list.push(2);
    list.push(3);
    list.shift(1);
    expect(list.toString()).toBe(('(1, 2, 3)'));
  });

  test("first", () => {
    let list = new LinkedList<number>();
    list.push(2);
    list.push(3);
    list.shift(1);
    expect(list.first()).toBe(1);
  });

  test("last", () => {
    let list = new LinkedList<number>();
    list.shift(1);
    list.push(2);
    list.push(3);
    expect(list.last()).toBe(3);
  });

  test("remove", () => {
    let list = new LinkedList<number>();
    list.shift(1);
    list.push(2);
    list.push(2);
    list.push(3);
    list.shift(0);
    list.push(4);
    expect(list.toString()).toMatchSnapshot();
    // remove from middle
    expect(list.contains(3)).toBe(true);
    expect(list.remove(3)).toBe(true);
    expect(list.contains(3)).toBe(false);
    expect(list.toString()).toMatchSnapshot();
    // remove from back
    expect(list.contains(0)).toBe(true);
    expect(list.remove(0)).toBe(true);
    expect(list.contains(0)).toBe(false);
    expect(list.toString()).toMatchSnapshot();
    // remove from front
    expect(list.contains(4)).toBe(true);
    expect(list.remove(4)).toBe(true);
    expect(list.contains(4)).toBe(false);
    expect(list.toString()).toMatchSnapshot();
     // remove one of duplicate
     expect(list.contains(2)).toBe(true);
     expect(list.remove(2)).toBe(true);
     expect(list.contains(2)).toBe(true);
     expect(list.toString()).toMatchSnapshot();
     // remove value not in array
     expect(list.remove(10)).toBe(false);
  });

  test("remove", () => {
    let list = new LinkedList<number>();
    list.shift(2);
    list.push(2);
    list.push(2);
    expect(list.toString()).toMatchSnapshot();
    // remove value not in array
    expect(list.removeAll(3)).toBe(false);
    expect(list.length()).toBe(3);
    // remove all value
    expect(list.removeAll(2)).toBe(true);
    expect(list.length()).toBe(0);
  });

});
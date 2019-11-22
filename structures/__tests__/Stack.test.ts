import Stack from '../Stack';


describe("Stack", () => {

  test("push", () => {
    let stack = new Stack<number>();
    stack.push(1);
  });

  test("peak", () => {
    let stack = new Stack<String>();
    stack.push('one');
    expect(stack.peak()).toBe('one');
  });

  test("pop", () => {
    let stack = new Stack<String>();
    stack.push('one');
    stack.push('two');
    expect(stack.pop()).toBe('two');
    expect(stack.pop()).toBe('one');
  });

  test("isEmpty", () => {
    let stack = new Stack<number>();
    expect(stack.isEmpty()).toBe(true);
    stack.push(0);
    expect(stack.isEmpty()).toBe(false);
  });

  test("toString", () => {
    let stack = new Stack<String>();
    stack.push('one');
    stack.push('two');
    stack.push('three');
    stack.push('four');
    expect(stack.toString()).toMatchSnapshot();
  });

});
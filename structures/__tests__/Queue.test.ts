import Queue from '../Queue';


describe("Queue", () => {

  test("enqueue", () => {
    let queue = new Queue<number>();
    queue.enqueue(1);
  });

  test("first", () => {
    let queue = new Queue<String>();
    queue.enqueue('one');
    expect(queue.first()).toBe('one');
  });

  test("dequeue", () => {
    let queue = new Queue<String>();
    queue.enqueue('one');
    queue.enqueue('two');
    expect(queue.dequeue()).toBe('one');
    expect(queue.dequeue()).toBe('two');
  });

  test("isEmpty", () => {
    let queue = new Queue<number>();
    expect(queue.isEmpty()).toBe(true);
    queue.enqueue(0);
    expect(queue.isEmpty()).toBe(false);
  });

  test("toString", () => {
    let queue = new Queue<String>();
    queue.enqueue('one');
    queue.enqueue('two');
    queue.enqueue('three');
    queue.enqueue('four');
    expect(queue.toString()).toMatchSnapshot();
  });

});
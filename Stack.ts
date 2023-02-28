class Stack<T> {
  constructor(
    public readonly run: (
      onPop: (data: [T, Stack<T>] | undefined) => void
    ) => void
  ) {}

  push(t: T): Stack<T> {
    return new Stack((data) => {
      data([t, this]);
    });
  }

  pop(): Stack<T> {
    return new Stack((data) => {
      this.run((headAndTail) => {
        if (headAndTail) {
          headAndTail[1].run(data);
        } else {
          data(undefined);
        }
      });
    });
  }

  print(): string {
    let s = '';
    this.run((headAndTail) => {
      if (headAndTail) {
        const [head, tail] = headAndTail;
        const tailStr = tail.print();
        s += head + (tailStr.length > 0 ? ', ' + tailStr : '');
      }
    });

    return s;
  }
}

const s = new Stack<number>(() => {})
  .push(3)
  .push(4)
  .push(5)
  .pop()
  .push(6)
  .push(7)
  .pop();

console.log(s.print());

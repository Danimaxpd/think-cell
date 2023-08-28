## Task description:

You are given the following source code:

```js
const sampleInput = [
  {
    key: [1, 4],
    val: "red",
  },
  {
    key: [-2, -1],
    val: "green",
  },
  {
    key: [2, 40],
    val: "blue",
  },
];

function makeQuery(input) {
  return (key) =>
    input.find(function (item) {
      return item.key[0] <= key && key < item.key[1];
    })?.val;
}
```

The array sampleInput contains a list of intervals (key) which are
mapped to a value (val). The function makeQuery takes input of
this format and returns a query function. The query function takes
a key argument and finds the interval that (right exclusive)
contains this key. It then returns the corresponding value for this
interval. If no interval is found, the query function returns
**“undefined”**. The function can be used like this:

```js
query = makeQuery(sampleInput);
query(3); // returns 'red'
```

**Note** that sampleInput is just example data. You should expect
the real input to be much bigger, and it can contain arbitrary data
for mapped values. The input is not ordered, and the first interval
takes precedence in case of overlaps.
Your task is to rewrite and improve makeQuery. The provided
query function is very simple and inefficient for large input data.
Imagine makeQuery to be called once on a given input and
preprocess it. Your returned query function should be able to
efficiently handle many requests for arbitrary input data. Apart
from that it should give the same results as our query function.

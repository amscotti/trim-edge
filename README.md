# trim-edge

A minimalistic library designed to trim specific strings from the start or end of an input string. If the specified substring exists at the beginning or the end of the original string, it is removed. Otherwise, the original string is returned as is. Great for path manipulation, query parameters, and custom string manipulation needs.

## Installation

```bash
npm install trim-edge
```

## Usage

### Trimming Strings

You can trim a target string from the start, end, or both sides of a given string.

```js
import { trimEdge } from 'trim-edge'

const result = trimEdge('/something/', '/', { pre: true, post: true })
console.log(result) // Outputs: "something"
```

### Creating Custom Trimming Functions

```js
import { createTrimEdgeFn } from 'trim-edge';

const trimSlashes = createTrimEdgeFn('/', { pre: true, post: true })
const result = trimSlashes('/something/')
console.log(result) // Outputs: "something"
```


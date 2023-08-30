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
import { trimEdge, OPTIONS } from 'trim-edge'

const resultBoth = trimEdge('/something/', '/') // Same as using OPTIONS.BOTH
console.log(resultBoth) // Outputs: "something"

const resultPre = trimEdge('/something/', '/', OPTIONS.PRE_ONLY)
console.log(resultPre) // Outputs: "something/"

const resultPost = trimEdge('/something/', '/', OPTIONS.POST_ONLY)
console.log(resultPost) // Outputs: "/something"

const resultNone = trimEdge('/something/', '/', OPTIONS.NONE)
console.log(resultNone) // Outputs: "/something/"
```

### Creating Custom Trimming Functions

```js
import { createTrimEdgeFn, OPTIONS } from 'trim-edge';

const trimSlashes = createTrimEdgeFn('/', OPTIONS.PRE_ONLY)
const result = trimSlashes('/something/')
console.log(result) // Outputs: "something/"
```


import test from 'ava'
import { testProp, fc } from '@fast-check/ava'
import { trimEdge, createTrimEdgeFn, OPTIONS } from './index.js'

test('should trim from the start with `PRE_ONLY`', t => {
  const result = trimEdge('/something/', '/', OPTIONS.PRE_ONLY)
  t.is(result, 'something/')
})

test('should trim from the end with `POST_ONLY`', t => {
  const result = trimEdge('/something/', '/', OPTIONS.POST_ONLY)
  t.is(result, '/something')
})

test('should trim from both start and end with `BOTH`', t => {
  const result = trimEdge('/something/', '/', OPTIONS.BOTH)
  t.is(result, 'something')
})

test('Should return the original string with `NONE`', t => {
  const result = trimEdge('/something/', '/', OPTIONS.NONE)
  t.is(result, '/something/')
})

test('should trim from both start and end by default', t => {
  const result = trimEdge('/something/', '/')
  t.is(result, 'something')
})

test('should trim using option object created', t => {
  const result = trimEdge('/something/', '/', { pre: true })
  t.is(result, 'something/')
})

test('should return the original string if target does not exist at start or end', t => {
  const result = trimEdge('something', '/')
  t.is(result, 'something')
})

test('should create a trim function that trims from the start', t => {
  const trimStartSlash = createTrimEdgeFn('/', OPTIONS.PRE_ONLY)
  const result = trimStartSlash('/something/')
  t.is(result, 'something/')
})

test('should create a trim function that trims from the end', t => {
  const trimEndSlash = createTrimEdgeFn('/', OPTIONS.POST_ONLY)
  const result = trimEndSlash('/something/')
  t.is(result, '/something')
})

test('should create a trim function that trims from both start and end', t => {
  const trimBoth = createTrimEdgeFn('/')
  const result = trimBoth('/something/')
  t.is(result, 'something')
})

// @ts-ignore
testProp('property: should return the original string if pre and post are false', [fc.string(), fc.string()], (t, str, target) => {
  const result = trimEdge(str, target, OPTIONS.NONE)
  t.is(result, str)
})

// @ts-ignore
testProp('property: trimming from start should not alter the end', [fc.string(), fc.string()], (t, str, target) => {
  const result = trimEdge(str, target, OPTIONS.PRE_ONLY)
  t.is(result, str.startsWith(target) && target.length > 0 ? str.slice(target.length) : str)
})

// @ts-ignore
testProp('property: trimming from end should not alter the start', [fc.string(), fc.string()], (t, str, target) => {
  const result = trimEdge(str, target, OPTIONS.POST_ONLY)
  t.is(result, str.endsWith(target) && target.length > 0 ? str.slice(0, -target.length) : str)
})

// @ts-ignore
testProp('property: created function should behave like trimEdge', [fc.string(), fc.string()], (t, str, target) => {
  const trimmer = createTrimEdgeFn(target)
  const result = trimmer(str)
  const expected = trimEdge(str, target)
  t.is(result, expected)
})

// @ts-ignore
testProp('property: trimming an empty target should return the original string', [fc.string()], (t, str) => {
  const result = trimEdge(str, '')
  t.is(result, str)
})

// @ts-ignore
testProp('property: trimming the same target from start and end should be commutative', [fc.string(), fc.string()], (t, str, target) => {
  const result1 = trimEdge(trimEdge(str, target, OPTIONS.PRE_ONLY), target, OPTIONS.POST_ONLY)
  const result2 = trimEdge(trimEdge(str, target, OPTIONS.POST_ONLY), target, OPTIONS.PRE_ONLY)
  t.is(result1, result2)
})

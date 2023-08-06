import test from 'ava'
import { testProp, fc } from '@fast-check/ava'
import { trimEdge, createTrimEdgeFn } from './index.js'

test('should trim from the start when pre is true', t => {
  const result = trimEdge('/something/', '/', { pre: true })
  t.is(result, 'something/')
})

test('should trim from the end when post is true', t => {
  const result = trimEdge('/something/', '/', { post: true })
  t.is(result, '/something')
})

test('should trim from both start and end when pre and post are true', t => {
  const result = trimEdge('/something/', '/', { pre: true, post: true })
  t.is(result, 'something')
})

test('should return the original string if target does not exist at start or end', t => {
  const result = trimEdge('something', '/', { pre: true, post: true })
  t.is(result, 'something')
})

test('should create a trim function that trims from the start', t => {
  const trimStartSlash = createTrimEdgeFn('/', { pre: true })
  const result = trimStartSlash('/something/')
  t.is(result, 'something/')
})

test('should create a trim function that trims from the end', t => {
  const trimEndSlash = createTrimEdgeFn('/', { post: true })
  const result = trimEndSlash('/something/')
  t.is(result, '/something')
})

test('should create a trim function that trims from both start and end', t => {
  const trimBoth = createTrimEdgeFn('/', { pre: true, post: true })
  const result = trimBoth('/something/')
  t.is(result, 'something')
})

testProp('property: should return the original string if pre and post are false', [fc.string(), fc.string()], (t, str, target) => {
  const result = trimEdge(str, target, { pre: false, post: false })
  t.is(result, str)
})

testProp('property: trimming from start should not alter the end', [fc.string(), fc.string()], (t, str, target) => {
  const result = trimEdge(str, target, { pre: true })
  t.is(result, str.startsWith(target) && target.length > 0 ? str.slice(target.length) : str)
})

testProp('property: trimming from end should not alter the start', [fc.string(), fc.string()], (t, str, target) => {
  const result = trimEdge(str, target, { post: true })
  t.is(result, str.endsWith(target) && target.length > 0 ? str.slice(0, -target.length) : str)
})

testProp('property: created function should behave like trimEdge', [fc.string(), fc.string()], (t, str, target) => {
  const trimmer = createTrimEdgeFn(target, { pre: true, post: true })
  const result = trimmer(str)
  const expected = trimEdge(str, target, { pre: true, post: true })
  t.is(result, expected)
})

testProp('property: trimming an empty target should return the original string', [fc.string()], (t, str) => {
  const result = trimEdge(str, '', { pre: true, post: true })
  t.is(result, str)
})

testProp('property: trimming the same target from start and end should be commutative', [fc.string(), fc.string()], (t, str, target) => {
  const result1 = trimEdge(trimEdge(str, target, { pre: true }), target, { post: true })
  const result2 = trimEdge(trimEdge(str, target, { post: true }), target, { pre: true })
  t.is(result1, result2)
})

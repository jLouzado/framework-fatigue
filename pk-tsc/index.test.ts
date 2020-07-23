import {assert} from 'chai'
import {id} from './index'

describe('identity', () => {
  it('should return whatever number it receives', () => {
    const actual = id(3)
    const expected = 3

    assert.strictEqual(actual, expected)
  })
  it('should return whatever string it receives', () => {
    const actual = id('hello world')
    const expected = 'hello world'

    assert.strictEqual(actual, expected)
  })
})

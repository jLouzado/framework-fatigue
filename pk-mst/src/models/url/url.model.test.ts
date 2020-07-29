import {assert} from 'chai'
import {urlFrom} from './url.model'

describe('URLModel', () => {
  describe('set', () => {
    it('should overwrite URL', () => {
      const URL = urlFrom('hello')
      URL.set('world')

      assert.strictEqual(URL.get(), 'world')
    })
  })
  describe('isValid', () => {
    it('should return true if valid URL', () => {
      const URL = urlFrom('https://www.google.com')
      assert.isTrue(URL.isValid())
    })
    it('should return true if missing the `www`', () => {
      const URL = urlFrom('https://google.com')
      assert.isTrue(URL.isValid())
    })
    it('should return false if invalid URL', () => {
      const URL = urlFrom('hello')
      assert.isFalse(URL.isValid())
    })
    it('should return false if malformed URL', () => {
      const URL = urlFrom('google.com')
      assert.isFalse(URL.isValid())
    })
  })
})

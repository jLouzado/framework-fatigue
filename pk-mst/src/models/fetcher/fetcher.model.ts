import {types, flow} from 'mobx-state-tree'

export const FetcherModel = types.model({}).actions((self) => ({
  fetch: flow(function* save() {
    try {
      yield fetch('url')
    } catch (e) {
      console.error('ERROR: ', e)
    }
  }),
  onResponse() {
    // save logic
  }
}))

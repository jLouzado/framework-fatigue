import {observable} from 'mobx'
import {observer} from 'mobx-react'
import React from 'react'
import {Either} from 'standard-data-structures'

export default class Repos {
  @observable repos = Either.left('Nothing was fetched')
}

@observer
export class app extends React.Component {}

import { range } from 'lodash'

import { numDays, numWeeks } from '../constants'
import dateDiffInDays from '../utils/dateDiffInDays'

import Week from './Week'

export default class Year {
  public index: number
  public start: Date
  public end: Date
  public weeks: Week[]

  constructor(index: number, lifeStart: Date) {
    this.index = index
    this.start = new Date(lifeStart.getTime())
    this.start.setFullYear(this.start.getFullYear() + index)
    this.end = new Date(lifeStart.getTime())
    this.end.setFullYear(this.end.getFullYear() + index + 1)
    this.end.setDate(this.end.getDate() - 1)

    this.weeks = range(numWeeks).map(
      i => new Week(index, i, this.start, this.end)
    )
  }

  public sliceWeeks = (startIndex: number, endIndex?: number) => {
    return this.weeks.slice(startIndex, endIndex)
  }

  public findIndex = (date: Date) => {
    const daysDiff = dateDiffInDays(this.start, date)
    let index = Math.floor(daysDiff / numDays)
    if (index === 52 && daysDiff <= 365) index = 51
    if (!this.weeks[index]) return null
    return index
  }
}

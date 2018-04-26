import { numDays, numWeeks } from '../constants'
import dateDiffInDays from '../utils/dateDiffInDays'

export interface IWeekStyle {
  fill: string
}

export default class Week {
  public index: number
  public start: Date
  public end: Date
  public numDays: number
  public isLast: boolean
  public title: string
  public style: IWeekStyle

  constructor(
    yearIndex: number,
    weekIndex: number,
    yearStart: Date,
    yearEnd: Date
  ) {
    this.index = yearIndex * numWeeks + weekIndex
    this.start = new Date(yearStart.getTime())
    this.start.setDate(this.start.getDate() + weekIndex * numDays)
    this.end = new Date(yearStart.getTime())
    this.end.setDate(this.end.getDate() + (weekIndex + 1) * numDays - 1)

    this.numDays = numDays
    this.isLast = weekIndex % numWeeks === numWeeks - 1
    if (this.isLast) {
      this.end = new Date(yearEnd.getTime())
      this.numDays = dateDiffInDays(this.start, this.end) + 1
    }
  }

  public applyEvent = (event: any) => {
    let durationStr = `${event.start} ~ ${event.end}`
    if (event.start === event.end) durationStr = `${event.start}`
    this.title = `${event.name} (${durationStr})`
    this.style = event.style
  }
}

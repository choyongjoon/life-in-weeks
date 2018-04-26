import { isNil, range } from 'lodash'

import Week from './Week'
import Year from './Year'

export default class Life {
  public static maxNumYears = 200

  public dob: string
  public lifeExpectancy: number
  public years: Year[]

  constructor(dob: string, lifeExpectancy: number) {
    this.dob = dob
    this.lifeExpectancy = lifeExpectancy

    const lifeStart = new Date(dob)
    if (isNaN(lifeStart.getTime())) {
      this.years = []
      return
    }

    const numYears = Math.min(lifeExpectancy, Life.maxNumYears)
    this.years = range(numYears).map(i => new Year(i, lifeStart))
  }

  public findWeeks = (event: any) => {
    const eventStart = new Date(event.start)
    const eventEnd = new Date(event.end)
    if (eventStart > eventEnd) return []

    const startIndex = this.findIndex(eventStart)
    const endIndex = this.findIndex(eventEnd)
    if (!startIndex) return []

    let weeksInRange: Week[] = []
    const endYearIndex = endIndex ? endIndex.yearIndex : this.years.length - 1
    for (let i = startIndex.yearIndex; i <= endYearIndex; i++) {
      let startWeekIndex = 0
      if (i === startIndex.yearIndex) startWeekIndex = startIndex.weekIndex
      let endWeekIndex
      if (i === endYearIndex && endIndex && !isNil(endIndex.weekIndex)) {
        endWeekIndex = endIndex.weekIndex + 1
      }
      weeksInRange = weeksInRange.concat(
        this.years[i].sliceWeeks(startWeekIndex, endWeekIndex)
      )
    }
    return weeksInRange
  }

  public findIndex = (date: Date) => {
    if (!this.years[0]) return null

    const lifeStartYear = this.years[0].start.getFullYear()
    const dateYear = date.getFullYear()
    let yearIndex = dateYear - lifeStartYear
    let year = this.years[yearIndex]
    if (year && year.start > date) {
      yearIndex -= 1
      year = this.years[yearIndex]
    }
    if (!year) return null

    const weekIndex = year.findIndex(date)
    if (weekIndex === null) return null

    return {
      yearIndex,
      weekIndex
    }
  }

  public applyEvent = (event: any) => {
    const weeks = this.findWeeks(event)
    weeks.forEach(week => week.applyEvent(event))
  }
}

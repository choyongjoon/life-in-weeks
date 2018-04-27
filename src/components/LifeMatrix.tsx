import * as React from 'react'

import { numWeeks } from '../constants'
import Life from '../models/Life'
import Year from '../models/Year'

import AgeAxis from './AgeAxis'
import MonthAxis from './MonthAxis'
import WeekCell, { cellHeight, cellMargin, cellWidth } from './WeekCell'

export interface IWeekMatrixProps {
  life: Life
}

export default class LifeMatrix extends React.Component<IWeekMatrixProps, {}> {
  public renderYearRow = (year: Year, i: number) => {
    const { weeks } = year
    const x = 0
    const y = i * (cellHeight + 2 * cellMargin)
    return (
      <g key={i} transform={`translate(${x},${y})`}>
        {weeks.map((week, j) => (
          <WeekCell key={week.index} week={week} j={j} />
        ))}
      </g>
    )
  }

  public render() {
    const { life } = this.props
    const { years } = life
    const numRows = years.length

    const height = numRows * (cellHeight + 2 * cellMargin)
    const width = numWeeks * (cellWidth + 2 + 2 * cellMargin)

    const months = []
    if (years.length > 0) {
      let currentMonth = null
      for (let i = 0; i < numWeeks; i++) {
        const month = years[0].weeks[i].start.getMonth()
        if (currentMonth !== month) {
          currentMonth = month
          months.push({ month, cellIndex: i })
        }
      }
    }

    return (
      <div>
        <svg height={height + marginTop} width={width + marginLeft}>
          <MonthAxis months={months} />
          <AgeAxis numRows={numRows} />
          <g transform={`translate(${marginLeft}, ${marginTop})`}>
            {years.map(this.renderYearRow)}
          </g>
        </svg>
      </div>
    )
  }
}

export const marginTop = 30
export const marginLeft = 30

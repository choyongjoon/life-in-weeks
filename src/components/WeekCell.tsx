import * as React from 'react'

import { numWeeks } from '../constants'
import Week from '../models/Week'

export interface IWeekCellProps {
  week: Week
  j: number
}

export default class WeekCell extends React.Component<IWeekCellProps, {}> {
  public render() {
    const { week, j } = this.props
    const { index, numDays } = week
    const style = Object.assign({}, defaultCellStyle, week.style)
    const { type, fill } = style

    const isLastWeek = index % numWeeks === numWeeks - 1
    let width = cellWidth
    if (isLastWeek) width = cellWidth - 7 + numDays

    if (type === 'circle')
      return (
        <circle
          key={index}
          cx={j * (cellWidth + 2 * cellMargin) + cellHeight / 2}
          cy={cellHeight / 2}
          r={circleRadius}
          fill={fill}
        />
      )
    else if (type === 'rect')
      return (
        <rect
          key={index}
          x={j * (cellWidth + 2 * cellMargin)}
          y={0}
          height={cellHeight}
          width={width}
          fill={fill}
        />
      )
    return null
  }
}

export const cellWidth = 7
export const cellHeight = 7
export const circleRadius = 4
export const cellMargin = 1
export const defaultCellStyle = {
  type: 'rect',
  fill: '#eeeeee'
}

import * as React from 'react'

import { marginLeft } from './LifeMatrix'
import { cellMargin, cellWidth } from './WeekCell'

export interface IMonthAxisProps {
  months: Array<{
    month: number
    cellIndex: number
  }>
}

export default class MonthAxis extends React.Component<IMonthAxisProps, {}> {
  public renderMonth = ({
    month,
    cellIndex
  }: {
    month: number
    cellIndex: number
  }) => {
    const x = cellIndex * (cellWidth + 2 * cellMargin)
    const y = 24

    return (
      <text
        key={cellIndex}
        transform={`translate(${x},${y})`}
        fontSize="14"
        fontFamily="Lato"
        textAnchor="start"
      >
        {month + 1}
      </text>
    )
  }

  public render() {
    const { months } = this.props

    return (
      <g transform={`translate(${marginLeft}, 0)`}>
        {months.map(this.renderMonth)}
      </g>
    )
  }
}

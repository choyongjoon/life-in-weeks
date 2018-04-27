import { range } from 'lodash'
import * as React from 'react'

import { marginTop } from './LifeMatrix'
import { cellHeight, cellMargin } from './WeekCell'

export interface IAgeAxisProps {
  numRows: number
}

export default class AgeAxis extends React.Component<IAgeAxisProps, {}> {
  public renderAge = (age: number) => {
    const x = 24
    const y = (age + 1) * (cellHeight + 2 * cellMargin)

    return (
      <text
        key={age}
        transform={`translate(${x},${y})`}
        fontSize="14"
        fontFamily="Lato"
        textAnchor="end"
      >
        {age}
      </text>
    )
  }

  public render() {
    const { numRows } = this.props
    const ages = range(Math.ceil(numRows / ageDistance)).map(
      (x: number) => x * ageDistance
    )

    return (
      <g transform={`translate(0, ${marginTop})`}>{ages.map(this.renderAge)}</g>
    )
  }
}

export const ageDistance = 5

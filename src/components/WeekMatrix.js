import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import range from 'lodash/range'

class WeekMatrix extends Component {
  static propTypes = {
    years: PropTypes.array.isRequired
  }

  renderMonth = ({ index, cellIndex }) => {
    const x = cellIndex * cellWidth
    const y = 24

    return (
      <text
        key={cellIndex}
        transform={`translate(${x},${y})`}
        fontSize="14"
        fontFamily="Lato"
        textAnchor="start"
      >
        {index + 1}
      </text>
    )
  }

  renderAge = age => {
    const x = 24
    const y = (age + 1) * cellHeight

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

  renderWeekCell = (week = {}, j) => {
    const { index, title, numDays } = week
    const style = Object.assign({}, week.style, defaultCellStyle)
    const { stroke, fill } = style

    const isLastWeek = index % numWeeks === numWeeks - 1
    let width = cellWidth
    if (isLastWeek) width = cellWidth - 7 + numDays

    return (
      <rect
        key={index}
        x={j * cellWidth}
        y={0}
        height={cellHeight}
        width={width}
        stroke={stroke}
        fill={fill}
        data-tip={title}
      />
    )
  }

  renderYearRow = (year, i) => {
    const { weeks } = year
    const x = 0
    const y = i * cellHeight
    return (
      <g key={i} transform={`translate(${x},${y})`}>
        {weeks.map(this.renderWeekCell)}
      </g>
    )
  }

  render() {
    const { years } = this.props
    const numRows = years.length

    const height = numRows * cellHeight
    const width = numWeeks * cellWidth + 2

    const months = []
    if (years.length > 0) {
      let currentMonth = null
      for (let i = 0; i < 52; i++) {
        const month = years[0].weeks[i].start.getMonth()
        if (currentMonth !== month) {
          currentMonth = month
          months.push({ index: month, cellIndex: i })
        }
      }
    }

    const ages = range(Math.ceil(numRows / ageDistance)).map(
      x => x * ageDistance
    )

    return (
      <div>
        <svg height={height + marginTop} width={width + marginLeft}>
          <g transform={`translate(${marginLeft}, 0)`}>
            {months.map(this.renderMonth)}
          </g>
          <g transform={`translate(0, ${marginTop})`}>
            {ages.map(this.renderAge)}
          </g>
          <g transform={`translate(${marginLeft}, ${marginTop})`}>
            {years.map(this.renderYearRow)}
          </g>
        </svg>
        <ReactTooltip />
      </div>
    )
  }
}

export default WeekMatrix
const numWeeks = 52

const marginTop = 30
const marginLeft = 30

const ageDistance = 5

const cellWidth = 9
const cellHeight = 9
const defaultCellStyle = {
  stroke: '#ffffff',
  fill: '#eeeeee'
}

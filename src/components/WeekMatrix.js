import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import range from 'lodash/range'

class WeekMatrix extends Component {
  static propTypes = {
    cells: PropTypes.array.isRequired
  }

  renderMonth = ({ index, cellIndex }) => {
    const x = cellIndex * cellWidth
    const y = 10

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

  renderWeekCell = (i, j) => {
    const { cells } = this.props
    const cellIndex = i * numWeeks + j
    const cell = cells[cellIndex] || {}
    const style = Object.assign({}, cell.style, defaultCellStyle)
    const { stroke, fill } = style

    return (
      <rect
        key={cellIndex}
        x={j * cellWidth}
        y={i * cellHeight}
        height={cellHeight}
        width={cellWidth}
        stroke={stroke}
        fill={fill}
        data-tip={cell ? cell.title : ''}
      />
    )
  }

  renderWeekRow = (i, numColumns = numWeeks) => {
    return range(numColumns).map(j => {
      return this.renderWeekCell(i, j)
    })
  }

  render() {
    const { cells } = this.props
    const numRows = Math.ceil(cells.length / numWeeks)

    const ages = range(Math.ceil(numRows / ageDistance)).map(
      x => x * ageDistance
    )

    const months = []
    if (cells.length >= 52) {
      let currentMonth = null
      for (let i = 0; i < 52; i++) {
        const month = cells[i].start.getMonth()
        if (currentMonth !== month) {
          currentMonth = month
          months.push({ index: month, cellIndex: i })
        }
      }
    }

    const rows = range(numRows - 1).map(i => {
      return this.renderWeekRow(i)
    })
    const finalRow = this.renderWeekRow(
      numRows - 1,
      cells.length - (numRows - 1) * numWeeks
    )

    const height = numRows * cellHeight
    const width = numWeeks * cellWidth

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
            {rows}
            {finalRow}
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

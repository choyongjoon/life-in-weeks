import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import range from 'lodash/range'

class WeekMatrix extends Component {
  static propTypes = {
    cells: PropTypes.array.isRequired
  }

  renderWeekCell = (i, j) => {
    const { cells } = this.props
    const cellIndex = i * numWeeks + j
    const cell = cells[cellIndex] || {}
    const style = Object.assign({}, cell.style, defaultCellStyle)
    const { stroke, fill } = style

    const width = 100 / numWeeks
    const height = 1

    return (
      <g key={cellIndex}>
        <rect
          x={`${j * width}%`}
          y={`${i * height}%`}
          width={`${width}%`}
          height={`${height}%`}
          stroke={stroke}
          fill={fill}
          data-tip={cell ? cell.title : ''}
        />
      </g>
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

    const rows = range(numRows - 1).map(i => {
      return this.renderWeekRow(i)
    })
    const finalRow = this.renderWeekRow(numRows - 1, cells.length % numWeeks)

    return (
      <div>
        <svg height={svgHeight} width={svgWidth + margin}>
          <g>
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

const defaultCellStyle = {
  stroke: '#ffffff',
  fill: '#eeeeee'
}

const svgHeight = 1000
const svgWidth = 500
const margin = 30

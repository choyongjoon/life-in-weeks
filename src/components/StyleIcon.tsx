import * as React from 'react'
import { List, Popup } from 'semantic-ui-react'

import colors from '../colors'

export interface IStyleIconProps {
  style: {
    fill: string
  }
  editStyle: any
}

export default class StyleIcon extends React.Component<IStyleIconProps, {}> {
  public onClickItem = (value: string) => () => {
    const { editStyle } = this.props
    editStyle({ fill: value })
  }

  public renderList = () => {
    const splittedColors = []
    const chunkSize = 5
    for (let i = 0; i < colors.length; i += chunkSize) {
      splittedColors.push(colors.slice(i, i + chunkSize))
    }

    return (
      <div>
        {splittedColors.map(colorChunks => (
          <List horizontal key={colorChunks[0].value}>
            {colorChunks.map(x => (
              <List.Item key={x.value} size="small">
                <List.Icon
                  name="square"
                  verticalAlign="middle"
                  style={{ color: x.value, cursor: 'pointer' }}
                  onClick={this.onClickItem(x.value)}
                />
              </List.Item>
            ))}
          </List>
        ))}
      </div>
    )
  }

  public render() {
    const { style } = this.props

    const trigger = (
      <List.Icon
        name="square"
        size="large"
        verticalAlign="middle"
        style={{ color: style.fill, cursor: 'pointer' }}
      />
    )

    const content = this.renderList()

    return (
      <Popup
        trigger={trigger}
        content={content}
        on="click"
        position="bottom left"
        onOpen={e => {
          e.stopPropagation()
        }}
        onClose={e => {
          e.stopPropagation()
        }}
      />
    )
  }
}

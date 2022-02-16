import React from 'react'
import { ChromePicker } from 'react-color'

class Tag extends React.Component {
  state = {
    color: {
      r: '85',
      g: '85',
      b: '85',
    },
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
  };

  render() {

    return (
      <div>
          <ChromePicker color={ this.state.color } onChange={ this.handleChange } disableAlpha={true} />
      </div>
    )
  }
}

export default Tag

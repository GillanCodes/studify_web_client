import React from 'react'
import { ChromePicker } from 'react-color'

class ColorPicker extends React.Component {

  state = {
    color: "#565656",
  }


  handleChange = (color) => {
    this.setState({ color: color.rgb })
  };

  getState = () => {
    return this.state
  }


  render() {

    console.log(this.getState())

    return (
      <div>
          <ChromePicker color={ this.state.color } onChange={ this.handleChange } disableAlpha={true} />
      </div>
    )
  }
}

export default ColorPicker

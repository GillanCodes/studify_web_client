import axios from 'axios';
import React from 'react'
import { ChromePicker } from 'react-color'
import { useDispatch } from 'react-redux';

class TagEdit extends React.Component {

  state = {
      color : '#FFF',
      bg_color: "#565656",
      text : ""
  }

  handleChangeColor = (color) => {
    this.setState({ color: color.hex })
  };

  handleChangeBgColor = (color) => {
    this.setState({ bg_color: color.hex })
  };

  textHandle = (e) => {
      this.setState({text : e.target.value})
  }

  getColor = () => {
    return this.state.color
  }

  getBgColor = () => {
    return this.state.bg_color
  }

  getText = () => {
      return this.state.text
  }

  getState = () => {
      return this.state
  }

  render() {

    const saved = document.getElementById('save')

    const saveHandle = () => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}/api/sheet/${this.props.sheetId}`,
            withCredentials: true,
            data: {
                tag_text: this.getText(),
                tag_bg_color: this.getBgColor(),
                tag_text_color: this.getColor()
            }
        }).then((res) => {
            saved.innerHTML = "Tag mis a jour !"
        }).catch((err) => console.log(err))
    }

    return (
      <div className='tagPop'>
            <p id="save"></p>
          
            <div className="fields">
                <input type="text" name="tag" id="tag" onChange={this.textHandle} />
                <button onClick={saveHandle}>Sauvegarder</button>
                <div className="tag" style={{backgroundColor:this.getBgColor(), color:this.getColor()}}>
                    <p>{this.getText()}</p>
                </div>
            </div>
          
            <div className="colorPicker">
                <div><ChromePicker color={ this.state.color } onChange={ this.handleChangeColor } disableAlpha={true} /> <p>Couleur Du Text</p></div>
                <div><ChromePicker color={ this.state.bg_color } onChange={ this.handleChangeBgColor } disableAlpha={true} /> <p>Couleur de fond</p></div>
            </div>
            
            
      </div>
    )
  }
}

export default TagEdit

import React, { Component } from 'react'
export default class DropOption extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSelected: false,
    }
  }
  render() {
    return (
      <div className='options' style={{ borderWidth: 3, borderRadius: 15, borderStyle: "solid", margin: 10, padding: 10, fontSize: 20, backgroundColor: this.state.isSelected ? "yellow" : "cyan" }} onClick={() => {
        if (!this.props.multiSelect) {
          this.props.setOption(this.props.option, this.props.issueArr);
        } else {
          this.props.selectedItem[this.props.option] = !this.state.isSelected;
          this.setState({ isSelected: !this.state.isSelected });
        }
      }}>{this.props.option.name ? this.props.option.name : this.props.option}</div>
    );
  }
}

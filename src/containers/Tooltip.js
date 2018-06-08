import React from 'react';
import '../style/tooltip.css'

export default class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {link: ''}
    this.projectLink = this.projectLink.bind(this);
  }
  projectLink(props) {
    if (this.props.mode.projectLink) {
      return <a href= {this.props.mode.projectLink} className='bullet link material-icons'> keyboard_arrow_right</a>;
    } else {
      return <div className='bullet' />;
    }
  }
  render() {
    if(this.props.mode != null) {

      return (
          <div className="tooltip">
            {this.projectLink()}
            <span className="tooltipText">
              <div className='tooltipTitle'>{this.props.mode.title}</div>
              <p className='tooltipDescription'>{this.props.mode.description}</p>
            </span>
          </div>
    )} else {
      return null;
    }
  }
}

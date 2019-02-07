import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div id='loadingPage' className="builderCss">
        <div className="cs-loader">
          <div className="cs-loader-inner">
            <label>	●</label>
            <label>	●</label>
            <label>	●</label>
            <label>	●</label>
            <label>	●</label>
            <label>	●</label>
          </div>
        </div>
      </div>
    );
  }
}

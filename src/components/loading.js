import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div id='loadingPage' className="builderCss">
        <div class="cs-loader">
          <div class="cs-loader-inner">
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

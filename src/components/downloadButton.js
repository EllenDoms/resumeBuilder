import React, { Component } from 'react';
import '../style/download.css';

export default class DownloadButton extends Component {
  render() {
    return(
      <div id="fixedDownload">
        <a id="download" href={process.env.PUBLIC_URL + '/cv.pdf'} download> Download my resume</a>
      </div>
    )
  }
}

import React, { Component } from 'react';
import { fetchResume } from '../actions';
import '../style/cv.css';
import Tooltip from '../containers/Tooltip';
import { connect } from 'react-redux';
import DownloadButton from '../components/downloadButton';

import NotFound from '../components/notFound';
import Loading from '../components/loading';

class Cv extends Component {
  componentDidMount() {
    console.log(this.props)
    if (!this.props.match.params.id) {
      this.props.fetchResume('resume');
    } else {
      this.props.fetchResume(this.props.match.params.id);
    }
  }
  render() {
    const { data, loading, notFound } = this.props;
    if (loading) {
      return <Loading />;
    }
    if (notFound) {
      return <NotFound />;
    }
    if(!data.tooltips) {
      data.tooltips = {};
    }
    return (
      <div id='ResumePage' className="resume1css">
        <DownloadButton />
        <div id='resume'>
          <div id='page1'>
            <div id='headerbg'/>
            <div id='header'>
              <div id='triangle1'></div>
              <h1>"{data.information.quote}"</h1>
              <div id='signed'>- {data.information.firstName} {data.information.lastName} -</div>
            </div>
            <div className='flexcontent'>
              <div className='columnLeft timeline'>
                <div className='container'>
                  <div id='experience' className='block'>
                    <h2>Experience </h2>
                    <Tooltip mode={data.tooltips.experience} />
                    <div className='content'>
                      {data.experience.map((item,i) => {
                        return (
                          <div className='item' key={'experience' + i}>
                            <p className='time left'>{item.timeto + ' ' + item.timefrom}</p>
                            <h3 className='right'>{item.title}</h3>
                            <p className='right'>{item.where}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div id='education' className='block'>
                    <h2>Education</h2>
                    <Tooltip mode={data.tooltips.education} />
                    <div className='content'>
                      {data.education.map((item,i) => {
                        return (
                          <div className='item' key={'skill' + i}>
                            <p className='time left'>{item.timeto + ' ' + item.timefrom}</p>
                            <h3 className='right'>{item.title}</h3>
                            <p className='right'>{item.where}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className='columnRight'>
                <div id='skills' className='block'>
                  <h2>Skills</h2>
                  <Tooltip mode={data.tooltips.skills} />
                  <div className='content'>
                    {data.skills.map((item,i) => {
                      return <p key={'skill' +i} className='left'>{item}</p>
                    })}
                  </div>
                </div>
                <div id='expertise' className='block'>
                  <h2>Expertise</h2>
                  <Tooltip mode={data.tooltips.expertise} />
                  <div className='content'>
                    {data.expertise.map((item,i) => {
                      return (
                        <div key={'expertise' + i} className='item'>
                          <p className='left'>{item.title}</p>
                          <div className='barRating'>
                            <div className='bar'></div>
                            <div className='rating' style={{width: item.rating + '%'}} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div id='triangles'>
              <div id='triangle2' />
              <div id='triangle3' />
            </div>
          </div>
          <div id='page2'>
            <div id='why' className='columncenter block'>
              <div id='triangle4' />
              <h1>{data.intro.title}</h1>
              <Tooltip mode={data.tooltips.intro} />
              <div className='content'>
                <div className='outline'>
                  {data.intro.content.map((paragraph,i) => {
                    return <p key={'paragraph'+ i}>{paragraph}</p>
                  })}
                </div>
              </div>
            </div>

            <div className='container'>
              <div className='flexcontent center'>
                <div className='columnLeft'>
                  <div id='personality' className='block'>
                    <h2>Personality</h2>
                    <Tooltip mode={data.tooltips.personality} />
                    <div className='content'>
                      {data.personality.map((item,i) => {
                        return (
                          <div key={'personality' + i}>
                            <p className='center'>{item}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className='columnRight'>
                  <div id='passions' className='block'>
                    <h2>Passions</h2>
                    <Tooltip mode={data.tooltips.passions} />
                    <div className='content'>
                      {data.passions.map((item,i) => {
                        return (
                          <div key={'passion' + i}>
                            <p className='center'>{item}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div id='information' className='flexcontent'>
                <div className='columnLeft'>
                  <Tooltip mode={data.tooltips.information} />
                  <p>{data.information.email}</p>
                  <a href={'http://www.' + data.information.website}><p>{data.information.website}</p></a>
                  <p>{data.information.telephone}</p>
                </div>
                <div className='columnRight'>
                  <a href={'http://www.' + data.information.linkedin}><p><span className="fa fa-linkedin-square" />{data.information.linkedin}</p></a>
                  <a href={'http://www.' + data.information.dribbble}><p><span className="fa fa-dribbble" />{data.information.dribbble}</p></a>
                  <a href={'http://www.' + data.information.github}><p><span className="fa fa-github" />{data.information.github}</p></a>
                </div>
              </div>

            </div>
            <div id='footer'>
              <div id='triangle5' />
            </div>
          </div>
        </div>
      </div>
    )
  };
}

function mapStateToProps(state) {
  return {
    data: state.data.resume,
    loading: state.data.loading,
    notFound: state.data.notFound
  };
}

export default connect( mapStateToProps, { fetchResume } )(Cv);

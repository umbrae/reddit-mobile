import React from 'react';
import DrawSVGPlugin from '../../../lib/greensock/plugins/DrawSVGPlugin.min.js';

import SVGFactory from '../../components/SVG';
var SVG;



class RIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {outline: false};
    this._play = this._play.bind(this);
    this.tweenOn = this.tweenOn.bind(this);
    this.tweenOff = this.tweenOff.bind(this);
  }

  render() {
    return (
      <SVG className='SVG-icon RIcon' width={SVG.ICON_SIZE} height={SVG.ICON_SIZE} fallbackIcon='icon-r-circled'>
        <circle className='SVG-fill' cx='10' cy='10' r='10'/>
        <path ref='r' className={'SVG-fill-bg' + (this.state.outline?' outline':'')} d="M12.198584,5.704752c-1.356266,0-2.418676,0.421916-3.200488,1.089559 C8.646981,6.258162,8.041927,5.903345,7.35319,5.903345H7.333333v4.765951v3.177311v0.164551 c0,0.528857,0.399096,0.990633,0.926847,1.024789c0.578288,0.037427,1.058969-0.420573,1.058969-0.990764v-0.198576v-3.673763 c0-1.370922,1.111352-2.482275,2.482267-2.482275c0.822558,0.000008,1.489364-0.666805,1.489364-1.489356V5.704761 L12.198584,5.704752z"/>
      </SVG>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!SVG.ENABLED) {
      return;
    }
    var played = nextProps.played;
    if (typeof played !== 'undefined' && played !== this.props.played) {
      this._play(played);
    }
  }

  _play(bool) {
    //TODO
  }

  tweenOn(callback) {
    this.setState({outline:true});
    var timeline = new TimelineLite({onComplete:callback});
    var r = this.refs.r.getDOMNode();
    timeline.add(TweenLite.from(r, 1, {drawSVG:0, ease:Cubic.easeInOut}));

    timeline.add(TweenLite.from(r, 0.5, {fill:'transparent'}));
    timeline.add(TweenLite.to(r, 0.5, {strokeWidth:0, autoRound:false}), 1);
  }

  tweenOff(callback) {
    var timeline = new TimelineLite({onComplete:callback});
    var r = this.refs.r.getDOMNode();
    timeline.add(TweenLite.to(r, 0.5, {fill:'transparent'}));
    timeline.add(TweenLite.to(r, 0.5, {strokeWidth:0.5, autoRound:false}), 0);

    timeline.add(TweenLite.to(r, 1, {drawSVG:0, ease:Cubic.easeInOut}));
  }
}

RIcon.defaultProps = {
  played: false,
};

function RIconFactory(app) {
  SVG = SVGFactory(app);
  return app.mutate('core/components/icons/RIcon', RIcon);
}

export default RIconFactory;

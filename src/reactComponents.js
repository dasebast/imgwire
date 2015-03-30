var React = require('react/addons');
var joinClasses = require('react/lib/joinClasses');


//create image cloud
var ImageCloud = React.createClass({
  propTypes: {
    imgs: React.PropTypes.array,
    clickHandler: React.PropTypes.func
  },
  getInitialState: function () {
    return {
      imgs: this.props.imgs,
      clickHandler: function(){},
    }
  },
  componentDidMount: function () {
    var tempImgs = this.props.imgs;
    var tempClickHandler = this.props.clickHandler;
    this.setState({
      imgs: tempImgs,
      clickHandler: tempClickHandler
    })
  },
  componentWillReceiveProps: function(nextProps) {
    var tempImgs = nextProps.imgs
    this.setState({
      imgs: tempImgs
    })
  },
  setHover: function (index) {
    var tempState = this.state.imgs;
    tempState[index].hovered = true;
    this.setState({
      imgs: tempState
    })
  },
  removeHover: function (index) {
    var tempState = this.state.imgs;
    tempState[index].hovered = false;
    this.setState({
      imgs: tempState
    })
  },
  formatUrl: function (url) {
    var fullUrl = url.split('/c_fill,h_200,w_300').join('');
    return fullUrl;
  },
  _handleClick: function(url, likes, tags, id){
    this.props.clickHandler(url, likes, tags, id);
    this.render();
  },
  render: function () {
    
    var mapImageCloud = !this.state.imgs ? null : this.state.imgs.map( (item, index) => {
      var styles = {
      img: {
        background: '#212121',
        borderRadius: '5px',
        position: 'absolute',
        left: item.left,
        top: item.top,
        height: item.h,
        width: item.w,
        boxShadow: '0px 7px 0px -3px rgba(30,30,30,.5)',
        zIndex: this.state.imgs.length - index
      }
    }
    
      return (

            <img key={item.id} className="animated-slow bounceIn box" style={styles.img} src={item.tUrl || item.url} height={item.h} width={item.w} onClick={this._handleClick.bind(null, item.url, item.likes, item.tags, item.id)} />
      )
    });


  return (
      <div>
        {mapImageCloud}
      </div>
    )
  }


});
//end create image cloud

/*{React.render(
  <ImageCloud />,
  document.getElementById('imgCloud'));}*/

angular
  .module('imgwire')
  .value('ImageCloud', ImageCloud)
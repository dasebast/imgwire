var React = require('react/addons');
var joinClasses = require('react/lib/joinClasses');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


//modal
var Modal = React.createClass({
  propTypes: {
    close: React.PropTypes.func,
    url: React.PropTypes.string
  },
  getInitialState: function () {
    return {
      url: ''
    }
  },
  componentDidMount: function () {
  },
  handleCloseModal: function () {
    console.log(this.props);
    this.props.closeModal();
  },
  render: function () {
    console.log(this.props);
    var styles = {
      box: {
        padding: '5px',
        border: '12px outset #B0BEC5',
        borderRight: '12px outset #90A4AE',
        borderBottom: '12px outset #90A4AE',
        borderRadius: '15px',
        margin: '50px auto 0 auto',
        height: '80%',
        width: '80%',
        maxHeight: '80%',
        maxWidth: '80%',
        background: '#757575',
        zIndex: 1002 
      },
      mask: {
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        background: 'rgba(0, 0, 0, .7)',
        zIndex: 1001
      },
      imgContainer: {
        display: 'inline-block',
        maxHeight: '80%',
        maxWidth: '70%' 
      },
      img: {
        float: 'left',
        height: '500px',
        width: 'auto',
        margin: '10px auto 10px auto',
        borderRadius: '5px'
      },
      buttonContainer: {
        float: 'right',
        width: '60px',
        height: '100%',
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      },
      button: {
        height: '60px',
        width: '60px',
        float: 'right'
      },
      buttonClose: {
        float: 'right'
      }
    };

    return (
      <div style={styles.mask}>
        <div className="modal-custom" style={styles.box}>
          <button className="btn btn-danger" style={styles.buttonClose} onClick={this.handleCloseModal}><span className="glyphicon glyphicon-remove"></span></button>
          <div className="imgContainer" style={styles.imgContainer}>
            <img className="noHover" src={this.props.url} style={styles.img}/>
            <br className="clear"/>
          </div>
          <div style={styles.buttonContainer}>
            <button className="btn btn-default" style={styles.button}><i className="fa fa-2x fa-hand-o-up"></i></button>
            <button className="btn btn-default" style={styles.button}><i className="fa fa-2x fa-hand-o-down"></i></button>
          </div>
          <br className="clear" />
        </div>
      </div>
    )
  }
})
//end modal


//create image cloud
var ImageCloud = React.createClass({
  propTypes: {
    imgs: React.PropTypes.array
  },
  getInitialState: function () {
    return {
      imgs: this.props.imgs,
      /*{modalHidden: true,}*/
      modalUrl: '',
      clicked: false
    }
  },
  componentDidMount: function () {
    this.setState({
      imgs: this.props.imgs
    })
  },
  componentWillReceiveProps: function(nextProps) {
    console.log(nextProps);
    this.setState({
      imgs: nextProps
    })
  },
  setHover: function (index) {
    var tempState = this.state.imgs;
    tempState[index].hovered = true;
    this.setState({
      imgs: tempState
    })
  },
  formatUrl: function (url) {
    var fullUrl = url.split('/c_fill,h_200,w_300').join('');
    return fullUrl;
  },
  openModal: function (url, id, top, left, hovered) {
    console.log(hovered);
    var newUrl = this.formatUrl(url);
    this.setState({
      modalUrl: newUrl
    })
  },
  closeModal: function () {
    console.log('clicky clicky')
    this.setState({
      modalUrl: ''
    })
  },
  removeHover: function (index) {
    var tempState = this.state.imgs;
    tempState[index].hovered = false;
    this.setState({
      imgs: tempState
    })
  },
  render: function () {
    
    /*{var modalShow = this.state.modalUrl ? <Modal closeModal={this.closeModal} url={this.state.modalUrl} onClick={this.closeModal}/> : null;}*/
    var modalShow = null;
    var mapImageCloud = !this.state.imgs ? null : this.state.imgs.map( (item, index) => {
      var styles = {
      img: {
        background: '#212121',
        borderRadius: '5px',
        border: this.state.imgs[index].hovered ? '8px solid black' : '1px solid black',
        position: 'absolute',
        left: item.left,
        top: item.top,
        height: item.h,
        width: item.w,
        boxShadow: '0px 7px 0px -3px rgba(30,30,30,.5)',
        zIndex: this.state.imgs[index].hovered ? 1000 : (this.state.imgs.length - index)
      }
    }
      return (

            <img key={item.id} imgs={this.state.imgs} className="animated fadeInRight box" style={styles.img} src={item.url} height={item.h} width={item.w} onMouseEnter={this.setHover.bind(null, index)} onMouseLeave={this.removeHover.bind(null, index)} onClick={this.openModal.bind(null, item.url, item.id, item.top, item.left, item.hovered)} close={this.closeModal} />
      )
    });


  return (
      <div>
        {modalShow}
        {mapImageCloud}
      </div>
    )
  }


});
//end create image cloud

/*{React.render(
  <ImageCloud />,
  document.getElementById('imgCloud'));}
*/
console.log('reactComponents I am in you');
angular
  .module('imgwire')
  .value('ImageCloud', ImageCloud)
  .value('Modal', Modal);

(function() {


angular
  .module('imgwire')
  .controller('HomeCtrl', HomeCtrl)
  .value('ImageCloud', ImageCloud);

function HomeCtrl (homeService, getImgs, imageCloudService) {
var React = require('react');
  var vm = this;

  vm.test = "homeCtrl win";

  vm.imgs = getImgs;

  imageCloudService.imageCloud(vm.imgs)
    .then(function(res) {
      console.log(res);
      vm.imgs = res;
    });

/*{//graceful image loading
var Image = React.createClass({
  getDefaultProps: {
    imgs: vm.imgs
  },
  getInitialState: function () {
    return {
      loaded: false
    };
  },

  onImageLoad: function () {
    if (this.isMounted()) {
      this.setState({loaded: true});
    }
  },

  componentDidMount: function () {
    var imgTag = this.refs.img.getDOMNode();
    var imgSrc = imgTag.getAttribute('src');
    // You may want to rename the component if the <Image> definition
    // overrides window.Image
    var img = new window.Image();
    img.onload = this.onImageLoad;
    img.src = imgSrc;
  },
  render: function () {
    var {className, ...props} = this.props;
    var imgClasses = 'image';
    if (this.state.loaded) {
      imgClasses = joinClasses(imgClasses, 'image-loaded');
    }
    return (
      <img ref="img" {...props} className={joinClasses(className, imgClasses)} />
    );
  }
});
//end graceful image loading

//modal
var Modal = React.createClass({
  propTypes: {
    closeModal: React.PropTypes.func,
    url: React.PropTypes.string
  },
  getInitialState: function () {
    return {
      url: ''
    }
  },
  componentDidMount: function () {
    var modalNode = this.refs.modal.getDOMNode();
    modalNode.focus();
  },
  handleCloseModal: function () {
    this.props.closeModal();
  },
  render: function () {
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
        maxHeight: '100%',
        maxWidth: '80%'
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
        <div ref='modal' className="modal-custom" style={styles.box}>
          <button className="btn btn-danger" style={styles.buttonClose} onClick={this.handleCloseModal}><span className="glyphicon glyphicon-remove"></span></button>
          <div className="imgContainer" style={styles.imgContainer}>
            <Image className="noHover" src={this.props.url} style={styles.img}/>
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
//end modal}*/


//create image cloud
var ImageCloud = React.createClass({
  propTypes: {
    imgs: React.PropTypes.array
  },
	getInitialState: function () {
		return {
			imgs: vm.imgs,
      /*{modalHidden: true,}*/
      modalUrl: ''
		}
	},
  componentDidMount: function () {
    this.setState({
      imgs: vm.imgs
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
  openModal: function (url) {
    window.url = url;
    var newUrl = this.formatUrl(url);
    this.setState({
    	modalUrl: newUrl
    })
  },
  closeModal: function () {
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
		var modalShow = this.state.modalUrl ? <Modal ref="modal" closeModal={this.closeModal} url={this.state.modalUrl}/> : null;
		var mapImageCloud = this.state.imgs.map( (item, index) => {
			var styles = {
			img: {
				borderRadius: '12px',
				border: '1px solid black',
				position: 'absolute',
				left: item.left,
				top: item.top,
				zIndex: this.state.imgs[index].hovered ? 1000 : (this.state.imgs.length - index),
			}
		}
			return (
            <img className="img img-responsive" key={item.id} value={item.id} style={styles.img} src={item.url} height={item.h} width={item.w} ref={index} onMouseEnter={this.setHover.bind(null, index)} onMouseLeave={this.removeHover.bind(null, index)} onClick={this.openModal.bind(null, item.url)} />
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


React.render(
  <ImageCloud />,
  document.getElementById('imgCloud'));

}

})();
(function() {

angular
  .module('imgwire')
  .controller('HomeCtrl', HomeCtrl);

function HomeCtrl (homeService, getImgs, imageCloudService) {

  var vm = this;

  vm.test = "homeCtrl win";

  vm.imgs = getImgs;

//graceful image loading
var Image = React.createClass({displayName: "Image",
  getDefaultProps: {
    imgs: vm.imgs
  },
  getInitialState:function () {
    return {
      loaded: false
    };
  },

  onImageLoad:function () {
    if (this.isMounted()) {
      this.setState({loaded: true});
    }
  },

  componentDidMount:function () {
    var imgTag = this.refs.img.getDOMNode();
    var imgSrc = imgTag.getAttribute('src');
    // You may want to rename the component if the <Image> definition
    // overrides window.Image
    var img = new window.Image();
    img.onload = this.onImageLoad;
    img.src = imgSrc;
  },

  render:function () {
    var $__0=   this.props,className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});
    var imgClasses = 'image';
    if (this.state.loaded) {
      imgClasses = joinClasses(imgClasses, 'image-loaded');
    }
    return (
      React.createElement("img", React.__spread({ref: "img"},  props, {className: joinClasses(className, imgClasses)}))
    );
  }
});
//end graceful image loading

//modal
var Modal = React.createClass({displayName: "Modal",
  propTypes: {
    closeModal: React.PropTypes.func,
    url: React.PropTypes.string
  },
  getInitialState:function () {
    return {
      url: ''
    }
  },
  componentDidMount:function () {
    var modalNode = this.refs.modal.getDOMNode();
    modalNode.focus();
  },
  handleCloseModal:function () {
    this.props.closeModal();
  },
  render:function () {
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
      React.createElement("div", {style: styles.mask}, 
        React.createElement("div", {ref: "modal", className: "modal-custom", style: styles.box}, 
          React.createElement("button", {className: "btn btn-danger", style: styles.buttonClose, onClick: this.handleCloseModal}, React.createElement("span", {className: "glyphicon glyphicon-remove"})), 
          React.createElement("div", {className: "imgContainer", style: styles.imgContainer}, 
            React.createElement(Image, {className: "noHover", src: this.props.url, style: styles.img}), 
            React.createElement("br", {className: "clear"})
          ), 
          React.createElement("div", {style: styles.buttonContainer}, 
            React.createElement("button", {className: "btn btn-default", style: styles.button}, React.createElement("i", {className: "fa fa-2x fa-hand-o-up"})), 
            React.createElement("button", {className: "btn btn-default", style: styles.button}, React.createElement("i", {className: "fa fa-2x fa-hand-o-down"}))
          ), 
          React.createElement("br", {className: "clear"})
        )
      )
    )
  }
})
//end modal


//create image cloud
var ImageCloud = React.createClass({displayName: "ImageCloud",
  propTypes: {
    imgs: React.PropTypes.array
  },
	getInitialState:function () {
		return {
			imgs: this.props.imgs,
      /*{modalHidden: true,}*/
      modalUrl: ''
		}
	},
	componentDidMount:function () {
    console.log(this.props);
		this.setState({
			imgs: this.props.imgs
		})
	},
  componentWillReceiveProps:function (nextProps) {
    this.setState({
      imgs: nextProps
    })
  },
  setHover:function (index) {
    var tempState = this.state.imgs;
    tempState[index].hovered = true;
    this.setState({
      imgs: tempState
    })
  },
  formatUrl:function (url) {
    var fullUrl = url.split('/c_fill,h_200,w_300').join('');
    return fullUrl;
  },
  openModal:function (url) {
    window.url = url;
    var newUrl = this.formatUrl(url);
    this.setState({
    	modalUrl: newUrl
    })
  },
  closeModal:function () {
    this.setState({
      modalUrl: ''
    })
  },
  removeHover:function (index) {
    var tempState = this.state.imgs;
    tempState[index].hovered = false;
    this.setState({
      imgs: tempState
    })
  },
	render:function () {
		var modalShow = this.state.modalUrl ? React.createElement(Modal, {ref: "modal", closeModal: this.closeModal, url: this.state.modalUrl}) : null;
		var mapImageCloud = this.state.imgs.map( function(item, index)  {
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
            React.createElement(Image, {className: "img img-responsive", key: item.id, value: item.id, style: styles.img, src: item.url, height: item.h, width: item.w, ref: index, onMouseEnter: this.setHover.bind(null, index), onMouseLeave: this.removeHover.bind(null, index), onClick: this.openModal.bind(null, item.url)})
			)
		}.bind(this));

	return (
			React.createElement("div", null, 
        modalShow, 
				mapImageCloud
			)
		)
	}


});
//end create image cloud

angular
  .module('imgwire')
  .value('ImageCloud', ImageCloud)
  .value('Image', Image)
  .value('Modal', Modal)

React.render(
  React.createElement(ImageCloud, null),
  document.getElementById('imgCloud'));

}

})();
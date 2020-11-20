import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _initializerDefineProperty from "@babel/runtime/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
var BaseUpload = (_dec = Component({
  name: 'BaseUpload'
}), _dec2 = Prop({
  type: String
}), _dec3 = Prop({
  type: Boolean,
  default: false
}), _dec4 = Prop([String, Array]), _dec5 = Watch('fileList'), _dec6 = Watch('value', {
  immediate: true
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inherits(BaseUpload, _Vue);

  function BaseUpload() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, BaseUpload);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(BaseUpload)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "listType", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "multiple", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor3, _assertThisInitialized(_this)), _this.fileList = [], _this.previewUrl = null, _this.previewVisible = false, _temp));
  }

  _createClass(BaseUpload, [{
    key: "fileListChanged",
    value: function fileListChanged(fileList) {
      var urlProp = this.urlProp;

      if (fileList.some(function (it) {
        return !it[urlProp];
      })) {
        return;
      }

      if (this.multiple) {
        this.$emit('input', fileList.map(function (it) {
          return it[urlProp];
        }));
      } else {
        if (fileList.length) {
          this.$emit('input', fileList[0][urlProp]);
        } else {
          this.$emit('input', null);
        }
      }
    }
  }, {
    key: "valueChanged",
    value: function valueChanged(value) {
      var _this2 = this;

      var urlProp = this.urlProp;

      if (this.multiple) {
        if (!value || !value.length) {
          this.fileList = [];
        } else {
          var urls = this.fileList.map(function (it) {
            return it[urlProp];
          });
          value.forEach(function (v, index) {
            if (!urls.includes(v)) {
              var _this2$fileList$push;

              _this2.fileList.push((_this2$fileList$push = {}, _defineProperty(_this2$fileList$push, urlProp, v), _defineProperty(_this2$fileList$push, "uid", 'file-' + index), _defineProperty(_this2$fileList$push, "name", 'file-' + index), _this2$fileList$push));
            }
          });
        }
      } else {
        if (!value) {
          this.fileList = [];
        } else if (!this.fileList.map(function (it) {
          return it[urlProp];
        }).includes(value)) {
          var _ref;

          this.fileList = [(_ref = {}, _defineProperty(_ref, urlProp, value), _defineProperty(_ref, "uid", 'file-0'), _defineProperty(_ref, "name", 'file-0'), _ref)];
        }
      }
    }
  }, {
    key: "props",
    get: function get() {
      var props = _extends({}, this.$attrs);

      if (this.listType === 'card') {
        props.listType = 'picture-card';
      } else if (this.listType === 'dragger') {
        props.drag = true;
        delete props.listType;
      } else if (this.listType) {
        props.listType = this.listType;
      }

      if (!props.limit) {
        if (!this.multiple) {
          props.limit = 1;
        }
      }

      if (!props.showFileList && this.listType === 'picture') {
        props.showFileList = false;
      }

      if (!props.showUploadList && this.listType === 'picture') {
        props.showUploadList = false;
      }

      props.multiple = this.multiple;
      return props;
    }
  }, {
    key: "urlProp",
    get: function get() {
      return 'url';
    }
  }]);

  return BaseUpload;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "listType", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "multiple", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "fileListChanged", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "fileListChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype)), _class2)) || _class);
export { BaseUpload as default };
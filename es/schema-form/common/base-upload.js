var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

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
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Vue) {
  _inheritsLoose(BaseUpload, _Vue);

  function BaseUpload() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Vue.call.apply(_Vue, [this].concat(args)) || this;

    _initializerDefineProperty(_assertThisInitialized(_this), "listType", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "multiple", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "value", _descriptor3, _assertThisInitialized(_this));

    _defineProperty(_assertThisInitialized(_this), "fileList", []);

    _defineProperty(_assertThisInitialized(_this), "previewUrl", null);

    _defineProperty(_assertThisInitialized(_this), "previewVisible", false);

    return _this;
  }

  var _proto = BaseUpload.prototype;

  _proto.fileListChanged = function fileListChanged(fileList) {
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
  };

  _proto.valueChanged = function valueChanged(value) {
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

            _this2.fileList.push((_this2$fileList$push = {}, _this2$fileList$push[urlProp] = v, _this2$fileList$push.uid = 'file-' + index, _this2$fileList$push.name = 'file-' + index, _this2$fileList$push));
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

        this.fileList = [(_ref = {}, _ref[urlProp] = value, _ref.uid = 'file-0', _ref.name = 'file-0', _ref)];
      }
    }
  };

  _createClass(BaseUpload, [{
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
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "listType", [_dec2], {
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
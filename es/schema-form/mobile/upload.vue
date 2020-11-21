<template >
<m-list-item multiple-line
             :title="title">
  <van-uploader v-model="fileList"
                accept="*"
                slot="extra"
                :after-read="afterRead"></van-uploader>
</m-list-item>
</template>
<script lang="js">
var _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
var AntdUpload = (_dec = Component({
  name: 'AntdUpload'
}), _dec2 = Prop(), _dec3 = Watch('fileList'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Vue) {
  _inherits(AntdUpload, _Vue);

  var _super = _createSuper(AntdUpload);

  function AntdUpload() {
    var _this;

    _classCallCheck(this, AntdUpload);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "title", _descriptor, _assertThisInitialized(_this));

    _this.fileList = [];
    return _this;
  }

  _createClass(AntdUpload, [{
    key: "fileListChanged",
    value: function fileListChanged(v) {
      console.log(v);
    }
  }, {
    key: "afterRead",
    value: function afterRead(f, n) {
      console.log(f);
      console.log(n);
    }
  }]);

  return AntdUpload;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "fileListChanged", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "fileListChanged"), _class2.prototype)), _class2)) || _class);
export { AntdUpload as default };
</script>
<style >

.ant-upload.ant-upload-select-picture-card:hover {
}

.ant-upload {
  &.ant-upload-disabled {
    cursor: not-allowed;

    &.ant-upload-select-picture-card {
      &:hover {
        border-color: #d9d9d9;
      }
    }

    .ant-upload-select-btn {
      i, .ant-upload-text {
        color: fade(#000, 25%);
      }
    }

    &.ant-upload-drag {
      p.ant-upload-drag-icon .anticon {
        color: fade(#000, 25%);
      }

      .ant-upload-text {
        color: fade(#000, 25%);
      }
    }
  }

  &.ant-upload-drag {
    p.ant-upload-drag-icon .anticon {
      color: fade(#000, 45%);
    }
  }
}

.ant-upload-plus {
  border: 1px solid #d9d9d9;
  cursor: pointer;
  width: 120px;
  border-radius: 4px;
  height: 120px;
  text-align: center;
  line-height: 120px;

  & > i {
    font-size: 28px !important;
  }
}
</style>
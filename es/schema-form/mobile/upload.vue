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

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
var AntdUpload = (_dec = Component({
  name: 'AntdUpload'
}), _dec2 = Prop(), _dec3 = Watch('fileList'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Vue) {
  _inheritsLoose(AntdUpload, _Vue);

  function AntdUpload() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Vue.call.apply(_Vue, [this].concat(args)) || this;

    _initializerDefineProperty(_assertThisInitialized(_this), "title", _descriptor, _assertThisInitialized(_this));

    _defineProperty(_assertThisInitialized(_this), "fileList", []);

    return _this;
  }

  var _proto = AntdUpload.prototype;

  _proto.fileListChanged = function fileListChanged(v) {
    console.log(v);
  };

  _proto.afterRead = function afterRead(f, n) {
    console.log(f);
    console.log(n);
  };

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
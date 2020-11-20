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
import _initializerDefineProperty from "@babel/runtime/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _class, _class2, _descriptor;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
var AntdUpload = (_dec = Component({
  name: 'AntdUpload'
}), _dec2 = Prop(), _dec3 = Watch('fileList'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inherits(AntdUpload, _Vue);

  function AntdUpload() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, AntdUpload);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AntdUpload)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "title", _descriptor, _assertThisInitialized(_this)), _this.fileList = [], _temp));
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
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec2], {
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
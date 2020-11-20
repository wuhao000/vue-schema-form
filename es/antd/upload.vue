<template >
<a-upload v-bind="props"
          v-if="listType !== 'dragger'"
          :file-list="fileList"
          @change="onChange"
          @preview="onPreview">
  <div v-if="listType === 'card' || listType === 'picture-card'"
       class="ant-upload-select-btn">
    <a-icon size="lg"
             type="plus"/>
    <div class="ant-upload-text">选择文件</div>
  </div>
  <div v-else-if="listType === 'picture'">
    <img v-if="fileList.length"
         alt=""
         style="height: 180px;width:180px;"
         :src="fileList[0].thumbUrl"/>
    <div v-else
         class="ant-upload-plus">
      <a-icon type="plus"></a-icon>
    </div>
  </div>
  <a-button v-else-if="listType === 'text'"
            :disabled="$attrs.disabled">选择文件
  </a-button>
  <slot/>
</a-upload>
<a-upload-dragger v-else
                  v-bind="props"
                  v-on="$listeners">
  <div :class="{disabled : $attrs.disabled}">
    <p class="ant-upload-drag-icon">
      <a-icon type="upload"/>
    </p>
    <p class="ant-upload-text">点击或者拖动文件到虚线框内上传</p>
    <p v-text="hint"
       class="ant-upload-hint"></p>
  </div>
</a-upload-dragger>
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

var _dec, _dec2, _class, _class2, _descriptor;

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BaseUpload from '../common/base-upload';
var AntdUpload = (_dec = Component({
  name: 'AntdUpload'
}), _dec2 = Prop(String), _dec(_class = (_class2 =
/*#__PURE__*/
function (_BaseUpload) {
  _inherits(AntdUpload, _BaseUpload);

  function AntdUpload() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, AntdUpload);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AntdUpload)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "hint", _descriptor, _assertThisInitialized(_this)), _temp));
  }

  _createClass(AntdUpload, [{
    key: "onChange",
    value: function onChange(f) {
      this.fileList = f.fileList;

      switch (f.file.status) {
        case 'done':
          if (f.file.response.code === 0) {
            var file = f.fileList.find(function (it) {
              return it.uid === f.file.uid;
            });
            file.thumbUrl = f.file.response.data.url;
          }

          break;

        case 'removed':
          this.fileList.splice(this.fileList.indexOf(f.file), 1);
          break;

        case 'uploading':
          break;
      }

      this.$emit('change', f);
    }
  }, {
    key: "onPreview",
    value: function onPreview(f) {
      this.$emit('preview', f);
    }
  }, {
    key: "urlProp",
    get: function get() {
      return 'thumbUrl';
    }
  }]);

  return AntdUpload;
}(BaseUpload), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "hint", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
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
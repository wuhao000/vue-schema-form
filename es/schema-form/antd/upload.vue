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
var _dec, _dec2, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BaseUpload from "../common/base-upload";
var AntdUpload = (_dec = Component({
  name: 'AntdUpload'
}), _dec2 = Prop(String), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_BaseUpload) {
  _inheritsLoose(AntdUpload, _BaseUpload);

  function AntdUpload() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _BaseUpload.call.apply(_BaseUpload, [this].concat(args)) || this;

    _initializerDefineProperty(_assertThisInitialized(_this), "hint", _descriptor, _assertThisInitialized(_this));

    return _this;
  }

  var _proto = AntdUpload.prototype;

  _proto.onChange = function onChange(f) {
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
  };

  _proto.onPreview = function onPreview(f) {
    this.$emit('preview', f);
  };

  _createClass(AntdUpload, [{
    key: "urlProp",
    get: function get() {
      return 'thumbUrl';
    }
  }]);

  return AntdUpload;
}(BaseUpload), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "hint", [_dec2], {
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
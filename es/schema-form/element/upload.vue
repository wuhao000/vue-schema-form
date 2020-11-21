<template >
<div>
  <el-upload v-bind="customProps"
             :class="'uploader--' + listType"
             :file-list="fileList">
    <div v-if="listType === 'dragger'">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </div>
    <i v-if="listType === 'card' || listType === 'picture-card'"
       class="el-icon-plus"
       slot="default"></i>
    <div v-if="listType === 'card' || listType === 'picture-card'"
         slot="file"
         slot-scope="{file}">
      <img alt=""
           class="el-upload-list__item-thumbnail"
           :src="file.url">
      <span class="el-upload-list__item-actions">
        <span class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)">
          <i class="el-icon-zoom-in"></i>
        </span>
        <span v-if="!$attrs.disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)">
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
    <div v-if="listType === 'picture'">

      <img v-if="fileList.length"
           class="avatar"
           :src="fileList[0].url">
      <i v-else
         class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <div v-if="listType === 'text'">
      <el-button size="small"
                 type="primary">点击上传
      </el-button>
    </div>
  </el-upload>
  <el-dialog :visible.sync="previewVisible">
    <img :src="previewUrl"/>
  </el-dialog>
</div>
</template>
<script lang="js">
var _dec, _class;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

import BaseUpload from "../common/base-upload";
import Component from 'vue-class-component';
var ElementUpload = (_dec = Component({
  name: 'ElementUpload'
}), _dec(_class = /*#__PURE__*/function (_BaseUpload) {
  _inherits(ElementUpload, _BaseUpload);

  var _super = _createSuper(ElementUpload);

  function ElementUpload() {
    _classCallCheck(this, ElementUpload);

    return _super.apply(this, arguments);
  }

  _createClass(ElementUpload, [{
    key: "handlePictureCardPreview",
    value: function handlePictureCardPreview(file) {
      this.previewVisible = true;
      this.previewUrl = file.url;
    }
  }, {
    key: "handleRemove",
    value: function handleRemove(file) {
      if (this.fileList.includes(file)) {
        this.fileList.splice(this.fileList.indexOf(file), 1);
      }
    }
  }, {
    key: "onSuccess",
    value: function onSuccess(res, v, list) {
      if (res.code === 0) {
        var url = res.data.url;

        if (this.multiple) {
          this.fileList.push({
            url: url,
            name: v.name
          });
        } else {
          this.fileList = [{
            url: url,
            name: v.name
          }];
        }
      }
    }
  }, {
    key: "customProps",
    get: function get() {
      var props = this.props;

      if (!props.onSuccess) {
        props.onSuccess = this.onSuccess;
      }

      return props;
    }
  }]);

  return ElementUpload;
}(BaseUpload)) || _class);
export { ElementUpload as default };
</script>
<style >
.uploader--picture {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:hover {
      border-color: #409EFF;
    }
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
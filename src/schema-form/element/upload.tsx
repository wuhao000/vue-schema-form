import BaseUpload from '../common/base-upload';
import Component from 'vue-class-component';

@Component({
  name: 'ElementUpload'
})
export default class ElementUpload extends BaseUpload {

  get customProps() {
    const props = this.props;
    if (!props.onSuccess) {
      props.onSuccess = this.onSuccess;
    }
    return props;
  }

  public handlePictureCardPreview(file) {
    this.previewVisible = true;
    this.previewUrl = file.url;
  }

  public renderDrag() {
    return <div>
      <i class="el-icon-upload"/>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </div>;
  }

  private renderFileSlot({file}) {
    return <div style={{
      display: 'flex',
      height: '100%',
      alignItems: 'center'
    }}>
      <img alt="" class="el-upload-list__item-thumbnail"
           style={{
             width: 'auto', height: 'auto', maxHeight: '100%', maxWidth: '100%'
           }}
           src={file.url}/>
      <span class="el-upload-list__item-actions">
        <span class="el-upload-list__item-preview"
              onclick={() => {
                this.handlePictureCardPreview(file);
              }}>
              <i class="el-icon-zoom-in"/>
            </span>
        {!this.$attrs.disabled ? <span
          class="el-upload-list__item-delete"
          onclick={() => {
            this.handleRemove(file);
          }}>
              <i class="el-icon-delete"/>
            </span> : null}
      </span>
    </div>;
  }

  private renderCard() {
    return <i class="el-icon-plus" slot="default"/>;
  }

  public render() {
    const {listType} = this;
    return <div>
      <el-upload props={this.customProps}
                 class={`uploader--${listType} el-upload`}
                 scopedSlots={{
                   file: this.renderFileSlot
                 }}
                 fileList={this.fileList}>
        {listType === 'dragger' ? this.renderDrag() : null}
        {listType === 'card' || listType === 'picture-card' ? this.renderCard() : null}
        {listType === 'picture' ? this.renderPicture() : null}
        {listType === 'text' ? this.renderText() : null}
      </el-upload>
      <el-dialog visible={this.previewVisible}
                 on={{
                   'update:visible': (v) => {
                     this.previewVisible = v;
                   }
                 }}>
        <img src={this.previewUrl} alt=""/>;
      </el-dialog>
    </div>;
  }

  public handleRemove(file) {
    if (this.fileList.includes(file)) {
      this.fileList.splice(this.fileList.indexOf(file), 1);
    }
  }

  public onSuccess(res, v) {
    if (res.code === 0) {
      const url = res.data.url;
      if (this.multiple) {
        this.fileList.push({url, name: v.name});
      } else {
        this.fileList = [{url, name: v.name}];
      }
    }
  }

  private renderText() {
    return <div>
      <el-button size="small" type="primary">点击上传</el-button>
    </div>;
  }

  private renderPicture() {
    return <div>
      {this.fileList.length
        ? <img class="avatar" src={this.fileList[0].url} alt=""/>
        : <i class="el-icon-plus avatar-uploader-icon"/>}
    </div>;
  }
}

import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';

@Component({
  name: 'BaseUpload'
})
export default class BaseUpload extends Vue {

  @Prop({type: String})
  public listType: string;
  @Prop({type: Boolean, default: false})
  public multiple: boolean;
  @Prop([String, Array])
  public value: string | string[];
  public fileList = [];
  public previewUrl = null;

  public previewVisible = false;


  get props() {
    const props: any = Object.assign({}, this.$attrs);
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

  get urlProp() {
    return 'url';
  }

  @Watch('fileList')
  public fileListChanged(fileList: any[]) {
    const {urlProp} = this;
    if (fileList.some(it => !it[urlProp])) {
      return;
    }
    if (this.multiple) {
      this.$emit('input', fileList.map(it => it[urlProp]));
    } else {
      if (fileList.length) {
        this.$emit('input', fileList[0][urlProp]);
      } else {
        this.$emit('input', null);
      }
    }
  }


  @Watch('value', {immediate: true})
  public valueChanged(value: string | string[]) {
    const {urlProp} = this;
    if (this.multiple) {
      if (!value || !value.length) {
        this.fileList = [];
      } else {
        const urls = this.fileList.map(it => it[urlProp]);
        (value as string[]).forEach((v, index) => {
          if (!urls.includes(v)) {
            this.fileList.push({
              [urlProp]: v,
              uid: 'file-' + index,
              name: 'file-' + index
            });
          }
        });
      }
    } else {
      if (!value) {
        this.fileList = [];
      } else if (!this.fileList.map(it => it[urlProp]).includes(value)) {
        this.fileList = [{
          [urlProp]: value,
          uid: 'file-0',
          name: 'file-0'
        }];
      }
    }
  }

}

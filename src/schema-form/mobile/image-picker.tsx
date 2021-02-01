import '../../styles/image-picker.less';
import '../../styles/mobile-image-picker.less';
import {SCHEMA_FORM_STORE_INJECT_KEY} from '../config';
import {SchemaFormStore} from '../../../types';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop, Watch} from 'vue-property-decorator';
import {isSame} from '../utils/array';

@Component({
  name: 'MobileImagePicker'
})
export default class MobileImagePicker extends Vue {
  @Prop([String, Array])
  public value?: string[] | string;
  public currentValue: Array<{ url: string }> = [];
  @Prop({type: Boolean, default: false})
  public multiple: boolean;
  @Inject(SCHEMA_FORM_STORE_INJECT_KEY)
  public store: SchemaFormStore;

  @Watch('value', {immediate: true})
  public valueChanged(value: string) {
    if (this.value) {
      if (this.multiple) {
        this.currentValue = (this.value as string[]).map(it => ({
          url: it
        }));
      } else {
        this.currentValue = [{url: this.value as string}];
      }
    } else {
      this.currentValue = [];
    }
  }

  @Watch('currentValue')
  public currentValueChanged(currentValue: Array<{ url: string }>) {
    if (currentValue && currentValue.length) {
      const value = currentValue.map(it => it.url);
      if (this.multiple) {
        if (this.value) {
          if (!isSame(this.value as string[], value)) {
            this.$emit('input', value);
          }
        } else {
          this.$emit('input', []);
        }
      } else {
        if (this.value !== currentValue[0].url) {
          this.$emit('input', currentValue[0].url);
        }
      }
    } else {
      if (this.value) {
        this.$emit('input', null);
      }
    }
  }

  public render() {
    const {currentValue} = this;
    const props: any = Object.assign({}, this.$attrs);
    props.length = this.length;
    props.selectable = currentValue.length < this.length;
    props.value = currentValue;
    return <m-list-item title={this.$attrs.title}
                        multipleLine={true}>
      {
        // @ts-ignore
        <m-image-picker slot="extra"
                        props={props}
                        onInput={(v) => {
                          this.currentValue = v;
                        }}/>
      }
    </m-list-item>;
  }

  get length() {
    return this.multiple ? 10 : 1;
  }

}

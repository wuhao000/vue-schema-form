const protocols = ['http', 'https'];
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';

@Component({
  name: 'UrlInput'
})
export default class UrlInput extends Vue {
  @Prop(Boolean)
  public disabled: boolean;
  @Prop({type: Array, default: () => protocols})
  public protocols: any[];
  @Prop(String)
  public value: string;
  public domain = '';
  public protocol = 'https';

  get current() {
    return (this.protocol ? this.protocol + '://' : '') + (this.domain ? this.domain : '');
  }

  get options() {
    return this.protocols.map(p => ({
      value: p,
      label: p + '://'
    }));
  }

  @Watch('current')
  public currentChanged(current: string) {
    this.$emit('input', current);
    this.$emit('change', current);
  }

  @Watch('value', {immediate: true})
  public valueChanged(v: string | null) {
    if (typeof v === 'string') {
      if (v !== this.current) {
        const protocol = this.protocols.find(p => v.startsWith(p + '://'));
        if (protocol) {
          this.protocol = protocol;
        }
        this.domain = v.replace(protocol + '://', '');
      }
    } else {
      this.protocol = null;
      this.domain = null;
    }
  }
}

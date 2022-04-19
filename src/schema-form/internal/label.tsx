import {defineComponent, PropType, ref} from 'vue';
import {LibComponents} from '../utils/utils';

export default defineComponent({
  name: 'SchemaFormFieldLabel',
  props: {
    platform: {
      type: String as PropType<'mobile' | 'desktop'>,
      default: 'desktop'
    },
    content: [String, Object],
    title: [String, Object]
  },
  setup() {
    const visible = ref(false);
    return {visible};
  },
  render() {
    const InfoIcon = LibComponents.icons[this.platform].info;
    if (this.platform === 'mobile' && LibComponents.popup[this.platform]) {
      const LibComponentsPopup: any = LibComponents.popup[this.platform];
      const Result = LibComponents.result[this.platform];
      const message = <div class={'schema-form-field-tip-content'}
                           style={{
                             textAlign: 'left'
                           }}>{this.content}</div>;
      return <div>
        {this.title}
        <InfoIcon
            onClick={(e) => {
              e.stopPropagation();
              this.visible = true;
            }}
            style={{marginLeft: '5px', color: '#247dc5'}}/>
        <LibComponentsPopup
            height={'100%'}
            title={this.title}
            showOk={false}
            v-model={[this.visible, 'visible']}>
          <Result message={message}
                  style={{paddingTop: '0'}}
                  buttonText="返回"
                  buttonType="primary"
                  onClick={(e) => {
                    this.visible = false;
                  }}/>
        </LibComponentsPopup>
      </div>;
    } else {
      const LibComponentsPopover: any = LibComponents.popover[this.platform];
      const slots = {
        default: () => (
            <label>
              <span>{this.title}</span>
              <InfoIcon style={{marginLeft: '5px', color: '#247dc5'}}/>
            </label>
        )
      };
      return <LibComponentsPopover
          content={
            <div>
              <h2>{this.title}</h2>
              {this.content}
            </div>
          }
          v-slots={slots}
          trigger="hover"/>;
    }
  }
});

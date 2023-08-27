import beautify from 'js-beautify';
import {computed, defineComponent, ref, watch} from 'vue';


export default defineComponent({
  name: 'ShowValue',
  props: {
    name: String,
    value: {
      type: [String, Object, Number, Array, Boolean]
    }
  },
  setup(props) {
    const highlight = ref(false);
    watch(() => props.value, () => {
      highlight.value = true;
      setTimeout(() => {
        highlight.value = false;
      }, 800);
    }, {deep: true});
    const highlightStyle = computed(() => {
      if (highlight.value) {
        return {
          backgroundColor: 'red',
          color: 'white',
          fontSize: '120%',
          fontWeight: 'bold'
        };
      }
      return {};
    });
    return {
      renderValue() {
        if (Array.isArray(props.value)) {
          return props.value.map(item => {
            if (typeof item === 'object') {
              return <ShowValue value={item} modal={false}/>;
            }
            return <span style={highlightStyle.value as any}>{item?.toString()}</span>;
          });
        }
        return <span style={highlightStyle.value as any}>{props.value?.toString()}</span>;
      }
    };
  },
  render() {
    return (
      <div style={{height: '38px', marginBottom: '20px'}}>
        <span>{this.name}</span>: {this.renderValue()}
      </div>
    );
  }
});

const ShowValue = defineComponent({
  name: 'ShowValue',
  props: {
    value: {
      type: [Object, String, Array, Number, Boolean]
    },
    modal: {type: Boolean, default: true}
  },
  setup(props) {
    const valueModalVisible = ref(false);
    const showData = () => {
      valueModalVisible.value = true;
    };
    return {
      valueModalVisible,
      showData,
      getContent() {
        return beautify(JSON.stringify(props.value));
      }
    };
  },
  render() {
    return <div>
      <a-button onClick={this.showData}>查看数据</a-button>
      <a-modal hideCancel
               onOk={() => {
                 this.valueModalVisible = false;
               }}
               v-model={[this.valueModalVisible, 'open']}>
        <pre>
          {this.getContent()}
        </pre>
      </a-modal>
    </div>;
  }
});


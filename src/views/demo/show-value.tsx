import beautify from 'js-beautify';
import Vue, {computed, defineComponent, ref, watch } from 'vue';


export default defineComponent({
  props: {
    name: String,
    value: {}
  },
  setup(props) {
    const highlight = ref(false);
    watch(() => props.value, (value) => {
      highlight.value = true;
      setTimeout(() => {
        highlight.value = false;
      }, 800);
    }, {deep: true})
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
    })
    return {
      renderValue() {
        if (Array.isArray(props.value)) {
          return props.value.map(item => {
            if (typeof item === 'object') {
              // @ts-ignore
              return <ShowValue value={item} modal={false}/>;
            }
            // @ts-ignore
            return <span style={highlightStyle.value}>{item?.toString()}</span>;
          });
        }
        // @ts-ignore
        return <span style={highlightStyle.value}>{props.value?.toString()}</span>;
      }
    }
  },
  render() {
    return (
        <div style={{height: '38px', marginBottom: '20px'}}>
          <span>{this.name}</span>: {this.renderValue()}
        </div>
    );
  }
})

const ShowValue = defineComponent({
  name: 'ShowValue',
  props: {
    value: {},
    modal: {type: Boolean, default: true}
  },
  setup(props) {
    const valueModalVisible = ref(false);
    const showData = () => {
      valueModalVisible.value = true;
    }
    return {
      valueModalVisible,
      showData,
      getContent() {
        return beautify(JSON.stringify(props.value));
      }
    }
  },
  render() {
    if (this.modal) {
      return <div>
        <a-button onClick={this.showData}>查看数据</a-button>
        <a-modal hideCancel
                 onOk={() => {
                   this.valueModalVisible = false;
                 }}
                 v-model={[this.valueModalVisible, 'visible']}>
        <pre>
          {this.getContent()}
        </pre>
        </a-modal>
      </div>;
    }
    return <div>
      {
        Object.keys(this.value).map(key => (
            // @ts-ignore
            <ValueField name={key} value={this.value[key]}/>
        ))
      }
    </div>;
  }
});


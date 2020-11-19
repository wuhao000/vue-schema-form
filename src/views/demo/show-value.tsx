import beautify from 'js-beautify';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';

@Component
class ValueField extends Vue {
  @Prop()
  public name: string;
  @Prop()
  public value: any;
  private highlight: boolean = false;

  @Watch('value', {deep: true})
  public valueChanged(value, old) {
    this.highlight = true;
    setTimeout(() => {
      this.highlight = false;
    }, 800);
  }

  get highlightStyle() {
    if (this.highlight) {
      return {
        backgroundColor: 'red',
        color: 'white',
        fontSize: '120%',
        fontWeight: 'bold'
      };
    }
    return {};
  }

  public render() {
    return (
      <div style={{height: '38px', marginBottom: '20px'}}>
        <span>{this.name}</span>: {this.renderValue()}
      </div>
    );
  }

  private renderValue() {
    if (Array.isArray(this.value)) {
      return this.value.map(item => {
        if (typeof item === 'object') {
          // @ts-ignore
          return <ShowValue value={item} modal={false}/>;
        }
        return <span style={this.highlightStyle}>{item?.toString()}</span>;
      });
    }
    return <span style={this.highlightStyle}>{this.value?.toString()}</span>;
  }
}

@Component({
  name: 'ShowValue'
})
class ShowValue extends Vue {
  @Prop()
  public value: any;
  @Prop({type: Boolean, default: true})
  public modal: boolean;
  public valueModalVisible = false;

  public showData(this: any) {
    this.valueModalVisible = true;
  }

  public render() {
    if (this.modal) {
      return <div>
        <a-button onClick={this.showData}>查看数据</a-button>
        <a-modal hideCancel
                 onOk={() => {
                   this.valueModalVisible = false;
                 }}
                 vModel={this.valueModalVisible}>
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

  private getContent() {
    return beautify(JSON.stringify(this.value));
  }
}

export default ShowValue as any;

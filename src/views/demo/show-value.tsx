import beautify from 'js-beautify';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'ShowValue'
})
class ShowValue extends Vue {
  @Prop()
  public value: any;
  public valueModalVisible = false;

  public showData(this: any) {
    this.valueModalVisible = true;
  }

  public render() {
    return <div>
      <a-button onClick={this.showData}>查看数据</a-button>
      <a-modal hideCancel
                onOk={() => {
                  this.valueModalVisible = false;
                }}
                vModel={this.valueModalVisible}>
        {this.valueModalVisible ? <pre>
          {this.getContent()}
        </pre> : null}
      </a-modal>
    </div>;
  }

  private getContent() {
    return beautify(JSON.stringify(this.value));
  }
}

export default ShowValue as any;

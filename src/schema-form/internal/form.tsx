import FieldBasedComponent from '@/schema-form/internal/field-based-component';
import {createField, getRealFields, hasListener, matchCondition} from '@/schema-form/internal/utils';
import {DESKTOP, getButtonComponent, getDefaultValue, getFormComponent, getRowComponent, MOBILE} from '@/schema-form/utils';
import {SchemaFormField} from '@/types/bean';
import difference from 'lodash.difference';
import eq from 'lodash.eq';
import Vue from 'vue';

export default Vue.extend({
  name: 'InternalForm',
  mixins: [FieldBasedComponent],
  props: {
    title: [Object, String],
    arrayIndex: [Number],
    pathPrefix: [Array],
    definition: {type: Object, required: true}
  },
  watch: {
    currentValue(currentValue: any) {
      this.$emit('input', currentValue);
      this.$emit('change', currentValue);
    },
    definition(this: any) {
      const currentValue = this.currentValue;
      const value = this.value;
      if (this.definition.array) {
        if (difference(currentValue as any[], value as any[])
            .concat(difference(value as any[], currentValue as any[])).length > 0) {
          this.buildExtraProperties();
        }
      } else if (!eq(currentValue, value)) {
        this.buildExtraProperties();
      }
    },
    value: {
      immediate: true,
      deep: true,
      handler(this: any, value: any[] | any) {
        if (value !== this.currentValue) {
          const currentValue = this.currentValue;
          if (this.definition.array) {
            if (difference(currentValue as any[], value as any[])
                .concat(difference(value as any[], currentValue as any[])).length > 0) {
              this.currentValue = value || [];
              this.buildExtraProperties();
            }
          } else if (!eq(currentValue, value)) {
            this.currentValue = value || {};
            this.buildExtraProperties();
          }
        } else if (!value) {
          this.currentValue = {};
          this.buildExtraProperties();
        }
      }
    }

  },
  created(this: any) {
    if (this.value) {
      if (this.definition.array) {
        if (this.value.length) {
          this.currentValue = this.value;
        } else {
          this.currentValue = [{}];
        }
      } else {
        this.currentValue = this.value;
      }
    } else {
      this.currentValue = this.definition.array ? [{}] : {};
    }
    this.buildExtraProperties();
  },
  methods: {
    setDefaultValue(this: any, property, tmpValue, fieldDef) {
      let copy = tmpValue;
      const splits = property.split('.');
      splits.forEach((name, index) => {
        if (index < splits.length - 1) {
          if (!copy[name]) {
            this.$set(copy, name, {});
          }
          copy = copy[name];
        } else {
          copy[name] = getDefaultValue(createField(
              this.currentValue, this.store,
              this.pathPrefix, fieldDef));
        }
      });
    },
    buildExtraProperties(this: any) {
      const {value} = this;
      let currentValue = this.currentValue;
      getRealFields(this.definition.fields).forEach(fieldDef => {
        const field = createField(this.currentValue, this.store, this.pathPrefix, fieldDef);
        if (typeof field.destructPath.destruct === 'string') {
          const property = fieldDef.property;
          if (this.definition.array) {
            if (!currentValue || !Array.isArray(currentValue)) {
              currentValue = [];
            }
            currentValue.forEach(tmpValue => {
              if (property.includes('.')) {
                this.setDefaultValue(property, tmpValue, fieldDef);
              } else {
                if (!tmpValue || tmpValue[property] === undefined) {
                  this.$set(tmpValue, property, getDefaultValue(field));
                } else if (value && value.length) {
                  this.$set(tmpValue, property, value[0][fieldDef.property]);
                }
              }
            });
          } else {
            const tmpValue = currentValue;
            if (property.includes('.')) {
              this.setDefaultValue(property, tmpValue, fieldDef);
            } else {
              if (!tmpValue || tmpValue[property] === undefined) {
                this.$set(tmpValue, property, getDefaultValue(field));
              } else if (value) {
                this.$set(tmpValue, property, value[fieldDef.property]);
              }
            }
          }
        }
      });
    },
    renderTitle(this: any) {
      if (this.$slots.title) {
        return this.$slots.title;
      } else if (this.store.props && this.title) {
        return <h2 class="form-title">{this.title}</h2>;
      }
    },
    getGroups(this: any, currentValue: { [p: string]: any } | Array<{ [p: string]: any }>) {
      const groups = [];
      const spanGroups = [];
      let lastHasSpan = false;
      getRealFields(this.definition.fields).forEach((field, index) => {
        const vnode = this.renderField(field, currentValue, index, true);
        if (field.span) {
          if (lastHasSpan) {
            spanGroups[spanGroups.length - 1].push(field.span);
            groups[groups.length - 1].push(vnode);
          } else {
            spanGroups.push([field.span]);
            groups.push([vnode]);
          }
          lastHasSpan = true;
        } else {
          lastHasSpan = false;
          spanGroups.push([]);
          groups.push([vnode]);
        }
      });
      return groups;
    },
    calcShowState(this: any, definition: SchemaFormField) {
      if (!definition.depends) {
        return definition.visible || definition.visible === null || definition.visible === undefined;
      } else {
        if (typeof definition.depends === 'function') {
          return definition.depends(this.currentValue);
        } else {
          return !definition.depends
              .map(condition => matchCondition(this.currentValue, condition))
              .some(it => !it);
        }
      }
    },
    renderSingleFields(this: any, currentValue: { [p: string]: any } | Array<{ [p: string]: any }>) {
      const {props} = this.store;
      const FormComponent = getFormComponent(this.store.platform);
      const groups = this.getGroups(currentValue);
      const formProps = this.getFormProps();
      return <FormComponent attrs={formProps}
                            ref="form"
                            on={this.$listeners}>
        {this.$slots.prepend}
        {!this.definition.array && this.isDesktop ? this.renderTitle() : null}
        {props && props.inline ? groups.reduce((a, b) => a.concat(b))
            : groups.map((group) => this.wrapGroup(group))}
        {this.renderDeleteSubFormButton()}
        {this.$slots.append}
      </FormComponent>;
    },
    renderAddFormButton(this: any) {
      const ButtonComponent = getButtonComponent();
      if (this.definition.array && this.store.mode === 'edit') {
        return <ButtonComponent
            attrs={{
              block: true,
              icon: 'plus',
              disabled: this.isDisabled
            }}
            class="m-b"
            onClick={() => {
              this.addSubItem();
            }}>新增一条</ButtonComponent>;
      }
    },
    addSubItem(this: any) {
      this.currentValue.push({});
    },
    renderDeleteSubFormButton(this: any) {
      const ButtonComponent = getButtonComponent();
      return Number.isInteger(this.arrayIndex) && this.store.mode !== 'display' && this.isDesktop ?
          <div class="delete-item-butn-wrapper" style={{textAlign: 'right'}}>
            <ButtonComponent disabled={this.isDisabled} onClick={() => {
              this.$emit('removeArrayItem');
            }} text icon="delete" type="danger">删除该条
            </ButtonComponent>
          </div> : null;
    },
    wrapGroup(this: any, group: any) {
      const RowComponent = getRowComponent();
      const {props} = this.store;
      if (this.isMobile || group.length === 1) {
        return group;
      }
      return <RowComponent gutter={props && props.gutter || 0}>{group}</RowComponent>;
    },
    getFormProps(this: any) {
      const formProps = Object.assign({}, this.store.props);
      if (this.isMobile) {
        const title = this.$slots.title || this.title;
        if (this.arrayIndex !== null && this.arrayIndex !== undefined) {
          formProps.title = <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>{title + ' (' + (this.arrayIndex + 1) + ')'}</span>
            {this.arrayIndex > 0 ? <a style={{color: '#e94721', cursor: 'pointer'}}
                                      onclick={() => {
                                        this.$emit('removeArrayItem', this.arrayIndex);
                                      }}>
              <ae-icon type="delete"/>
              删除
            </a> : null}
          </div>;
        } else {
          formProps.title = title;
        }
      }
      formProps.inline = this.store.inline;
      formProps.disabled = this.isFormDisabled;
      return formProps;
    }
  },
  computed: {
    form(): any {
      return this.$refs.form;
    },
    isMobile(this: any) {
      return this.store.platform === MOBILE;
    },
    isDesktop(this: any) {
      return this.store.platform === DESKTOP;
    },
    isFormDisabled() {
      return this.isDisabled || this.isLoading;
    },
    isDisabled() {
      return this['store'].disabled;
    },
    isLoading() {
      return this['store'].loading;
    },
    isReadonly() {
      return this['store'].readonly;
    }
  },
  render(this: any) {
    return <div class="schema-form">
      {this.$slots.header}
      {this.definition.array ? this.renderTitle() : null}
      {this.renderSingleFields(this.currentValue)}
      {this.renderAddFormButton()}
      {this.$slots.default}
      {this.$slots.footer}
    </div>;
  }
}) as any;

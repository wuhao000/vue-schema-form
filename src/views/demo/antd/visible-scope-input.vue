<template>
  <ae-layout>
    <ae-layout-content>
      <span v-if="display"
            v-text="content"></span>
      <d-form-item v-else-if="$attrs.title"
                   :label="$attrs.title">
        <d-input readOnly
                 v-if="selectType === 'input'"
                 style="cursor:pointer"
                 :placeholder="$attrs.placeholder"
                 :value="content"
                 @click="showMemberSelect = true"/>
      </d-form-item>
      <d-input readOnly
               v-else-if="selectType === 'input'"
               style="cursor:pointer"
               :placeholder="$attrs.placeholder"
               :value="content"
               @click="showMemberSelect = true"/>
      <template v-else-if="selectType === 'button'">
        <d-button v-text="btnText"
                  type="primary"
                  @click="showMemberSelect = true">
        </d-button>
        <div>
          <ul class="member-list">
            <li v-for="department in displayValue.departments"
                :key="department.id">
              <ae-icon class="icon"
                       type="folder"></ae-icon>
              <span>{{department.name}}</span>
              <ae-icon class="btn close-btn"
                       type="close-circle"
                       @click="removeDepartment(department)"></ae-icon>
            </li>
          </ul>
          <ul class="member-list">
            <li v-for="user in displayValue.users"
                :key="user.id">
              <img alt=""
                   class="icon avatar avatar--mini"
                   :src="user.avatar"/>
              <span>{{user.name}}</span>
              <ae-icon class="btn close-btn"
                       type="close-circle"
                       @click="removeUser(user)"></ae-icon>
            </li>
          </ul>
        </div>
      </template>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="ts">
  import _ from 'lodash';
  import difference from 'lodash.difference';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'VisibleScopeInput'
  })
  export default class VisibleScopeInput extends Vue {

    /**
     * 按钮显示的文本
     */
    @Prop({type: String, default: '选择范围'})
    public btnText: string;
    @Prop({type: Boolean, default: false})
    public department: boolean;
    @Prop({type: Boolean, default: false})
    public display: boolean;
    /**
     * 允许选择的部门最大数量
     */
    @Prop({type: Number, default: 0})
    public maxDepartments: number;
    /**
     * 允许选择的用户最大数量
     */
    @Prop({type: Number, default: 0})
    public maxUsers: number;

    @Prop({type: String, default: 'button'})
    public selectType: 'button' | 'input';
    @Prop({type: Boolean, default: true})
    public user: boolean;
    /**
     * 初始值，根据不同的参数类型不同：
     * 1. 当user为true，department为false时，且maxUsers=1时，类型为MemberVO
     * 2. 当user为true，department为false时，且maxUsers!=1时，类型为MemberVO[]
     * 3. 当user为false，department为true时，且maxUsers=1时，类型为SimpleCorpDepartment
     * 4. 当user为false，department为true时，且maxUsers!=1时，类型为SimpleCorpDepartment[]
     * 5. 当user、department都为true时，类型为VisibleScopeVO
     */
    @Prop({type: [Array, Object, String, Number]})
    public value: any;
    @Prop({type: String, default: 'object'})
    public valueType: 'id' | 'object';
    public currentValue: any;
    public showMemberSelect: boolean = false;

    get content() {
      if (this.currentValue.users) {
        return this.currentValue.departments.map(it => it.name).concat(
            this.currentValue.users.map(it => it.name)
        ).join('、');
      } else if (this.value) {
        return this.value.toString();
      }
      return '';
    }

    get departments(): any[] {
      return [];
    }

    get displayValue() {
      return this.getCurrentValue(true);
    }

    get onlyDepartment() {
      return !this.user && this.department;
    }

    get onlyUser() {
      return this.user && !this.department;
    }

    get type() {
      const type = [];
      if (this.user) {
        type.push('user');
      }
      if (this.department) {
        type.push('department');
      }
      return type;
    }

    get users() {
      return [];
    }

    @Watch('currentValue')
    public currentValueChanged(value: any) {
      let finalValue = null;
      if (this.valueType === 'object') {
        if (this.onlyUser) {
          if (this.maxUsers === 1) {
            finalValue = value.users.length ? value.users[0] : null;
          } else {
            finalValue = value.users;
          }
        } else if (this.onlyDepartment) {
          if (this.maxDepartments === 1) {
            finalValue = value.departments.length ? value.departments[0] : null;
          } else {
            finalValue = value.departments;
          }
        } else {
          finalValue = value;
        }
      } else {
        if (this.onlyUser) {
          if (this.maxUsers === 1) {
            finalValue = value.users.length ? value.users[0].id : null;
          } else {
            finalValue = value.users.map(it => it.id);
          }
        } else if (this.onlyDepartment) {
          if (this.maxDepartments === 1) {
            finalValue = value.departments.length ? value.departments[0].id : null;
          } else {
            finalValue = value.departments.map(it => it.id);
          }
        } else {
          finalValue = {
            users: value.users && value.users.map(it => it.id),
            departments: value.departments && value.departments.map(it => it.id)
          };
        }
      }
      let hasDiff = false;
      if (Array.isArray(this.value)) {
        hasDiff = _.difference(this.value as any[], finalValue).concat(_.difference(finalValue,
            this.value as any[])).length > 0;
      } else if (this.user && this.department) {
        const users1 = (this.value as any).users;
        const users2 = finalValue.users;
        const departments1 = (this.value as any).departments;
        const departments2 = finalValue.departments;
        hasDiff = _.difference(users1, users2).concat(_.difference(users2, users1)).length +
            _.difference(departments1, departments2).concat(_.difference(departments2, departments1)).length > 0;
      } else {
        if (this.valueType === 'object') {
          hasDiff = this.value && (this.value as any).id !== finalValue && finalValue.id;
        } else {
          hasDiff = this.value !== finalValue;
        }
      }
      if (hasDiff) {
        this.$emit('input', finalValue);
        this.$emit('change', finalValue);
      }
    }

    @Watch('departments')
    public departmentsChanged() {
      if (this.department) {
        this.refreshCurrentValue();
      }
    }

    @Watch('users')
    public usersChanged() {
      if (this.user) {
        this.refreshCurrentValue();
      }
    }


    @Watch('value', {immediate: true})
    public valueChanged(value) {
      this.refreshCurrentValue();
    }

    private getCurrentValue(returnIfNoDiff: boolean = false): any {
      const value = this.value as any;
      if (value) {
        const tmp: any = {users: [], departments: []};
        if (this.valueType === 'object') {
          if (this.onlyUser) {
            if (this.maxUsers === 1) {
              tmp.users = [value];
            } else {
              tmp.users = value || [];
            }
          } else if (this.onlyDepartment) {
            if (this.maxDepartments === 1) {
              tmp.departments = [value];
            } else {
              tmp.departments = value || [];
            }
          } else {
            tmp.users = value.users || [];
            tmp.departments = value.departments || [];
          }
        } else {
          if (this.onlyUser) {
            if (this.maxUsers === 1) {
              const user = this.users.find(it => it.id === value);
              tmp.users = user ? [user] : [];
            } else {
              tmp.users = value ? this.users.filter(it => value.includes(it.id)) : [];
            }
          } else if (this.onlyDepartment) {
            if (this.maxDepartments === 1) {
              const dep = this.departments.find(it => it.id === value);
              tmp.departments = dep ? [dep] : [];
            } else {
              tmp.departments = value ? this.departments.filter(it => value.includes(it.id)) : [];
            }
          } else {
            tmp.users = value && value.users ? this.users.filter(it => value.users.includes(it.id)) : [];
            tmp.departments = value && value.departments ? this.departments.filter(it => value.departments.includes(it.id)) : [];
          }
        }
        if (this.currentValue === undefined) {
          return tmp;
        }
        const diffUsers = difference(this.currentValue.users.map(it => it.id), tmp.users.map(it => it.id))
            .concat(difference(tmp.users.map(it => it.id), this.currentValue.users.map(it => it.id)));
        const currentDepIds = this.currentValue.departments.map(it => it.id);
        const newDepIds = tmp.departments.map(it => it.id);
        const diffDepartments = difference(currentDepIds, newDepIds).concat(difference(newDepIds, currentDepIds));
        if (diffUsers.length || diffDepartments.length || returnIfNoDiff) {
          return tmp;
        }
      } else if (returnIfNoDiff) {
        return {users: [], departments: []};
      }
    }

    public onConfirm(value: { users: any[], departments: any[] }) {
      this.currentValue = value;
    }

    public refreshCurrentValue() {
      const currentValue = this.getCurrentValue();
      if (currentValue) {
        this.currentValue = currentValue;
      }
    }

    public removeDepartment(dep: any) {
      this.currentValue.departments.splice(this.currentValue.departments.indexOf(dep), 1);
    }

    public removeUser(user: any) {
      this.currentValue.users.splice(this.currentValue.users.indexOf(user), 1);
    }
  }
</script>
<style scoped lang="less">
  .btn {
    cursor: pointer;
  }

  .member-list {
    li {
      background: #f3f3f3;
      height: 35px;
      line-height: 35px;
      display: inline-block;
      padding: 0 10px;
      margin: 5px 20px 5px 0;

      i.icon {
        color: cornflowerblue;
        margin-top: 10px;
      }

      .icon {
        float: left;
        margin-top: 7px;
        margin-right: 5px;
      }

      .close-btn {
        display: none;
        margin-left: 5px;
        float: right;
        margin-top: 10px;
      }

      &:hover {
        .close-btn {
          display: inline-block;
          color: dodgerblue;
        }
      }
    }
  }
</style>

<template>
  <FormItem :label="title">
    <div class="table-layout-wrapper">
      <div class="table-layout">
        <!-- 标题行 -->
        <div
            v-if="hasTitleRow"
            class="table-row table-header-row">
          <div
              v-for="field in definition.fields"
              :key="(field as SchemaFormField).property"
              class="table-cell"
          >
            <FormItem
                :label="resolveTitle(field as SchemaFormField, undefined, undefined)"
                :required="(field as SchemaFormField).required"
                :tip="(field as SchemaFormField).description"
            />
          </div>
          <div class="operations-col table-cell">操作</div>
        </div>
        <!-- 数据行 -->
        <TransitionGroup
            name="flip-list"
            :class="rowsClass"
            :style="style"
            tag="div"
        >
          <table-row
              v-for="(row, index) in rows"
              :key="row.props.key"
              :array-index="row.props.arrayIndex"
              :show-move-down="index !== rows.length - 1"
              :show-move-up="row.props.arrayIndex !== 0"
              :show-remove="showRemove"
              @add="$emit('add', row.props.arrayIndex + 1)"
              @move-up="handleMoveUp(row.props.arrayIndex)"
              @move-down="handleMoveDown(row.props.arrayIndex)"
              @remove="handleRemove(row.props.arrayIndex)"
              @show-add="handleShowAdd($event, index, rows.length - 1)"
              @hide-add="addVisible = false"
          >
            <component :is="row" />
          </table-row>
        </TransitionGroup>
        <!-- 悬浮添加按钮 -->
        <div
            class="add-row"
            :class="{ 'add-row-visible': addVisible }"
            :style="{ top: `${addOffset}px` }"
            @mouseenter="addVisible = true"
            @mouseleave="addVisible = false"
        >
          <div class="table-cell">
            <div
                class="add-row-btn"
                @click="$emit('add', undefined)">
              <plus-circle-filled />
            </div>
          </div>
        </div>
      </div>
      <!-- 底部添加按钮 -->
      <div
          v-if="showAdd"
          class="table-row table-row-default-add">
        <div @click="$emit('add', undefined)">
          <plus-circle-two-tone />
          <span v-if="addText">{{ addText }}</span>
        </div>
      </div>
    </div>
  </FormItem>
</template>
<script setup lang="ts">
  import classNames from 'classnames';
  import { computed, inject, PropType, ref, useSlots, watch } from 'vue';
  import { ClassType, SchemaFormField, SchemaFormStore } from '../../../types';
  import { FieldDefinition } from '../bean/field-definition';
  import { SchemaFormStoreKey } from '../utils/key';
  import { LibComponents, resolveTitle } from '../utils/utils';
  import './table.less';
  import { baseLayoutProps } from './base-layout';
  import TableRow from './table-row.vue';

  defineOptions({
    name: 'TableLayout',
    components: {
      'table-row': TableRow
    }
  });

  const props = defineProps({
    ...baseLayoutProps,
    addText: String,
    title: {
      type: [String, Object]
    },
    showAdd: {
      type: Boolean,
      default: true
    },
    showRemove: {
      type: Boolean,
      default: true
    },
    definition: {
      type: Object as PropType<FieldDefinition>
    },
    class: [String, Object, Array] as PropType<string | string[] | Record<string, unknown>>,
    style: [Object, String]
  });

  const emit = defineEmits(['add', 'remove', 'move-up', 'move-down']);

  // 获取注入的 store
  const store: SchemaFormStore = inject(SchemaFormStoreKey);
  const FormItem = computed(() => LibComponents.formItem[store.platform]);

  // 获取slots
  const slots = useSlots();

  // 用于强制刷新的标志
  const refreshKey = ref(0);

  // 监听store.value变化，强制刷新表格
  watch(() => store.value, () => {
    refreshKey.value++;
  }, { deep: true });

  // 处理表格状态
  const addOffset = ref(0);
  const addVisible = ref(false);

  // 获取默认插槽的行
  const rows = computed(() => {
    // 强制依赖refreshKey刷新
    refreshKey.value;
    // 强制依赖于 slots.default 的刷新
    return slots.default?.() || [];
  });

  // 计算标题行是否显示
  const hasTitleRow = computed(() => Array.isArray(props.definition?.fields));

  // 计算行样式
  const rowsClass = computed(() =>
      classNames('table-layout-body table-layout-body-' + store.platform, props.class as ClassType)
  );

  // 处理事件
  const handleRemove = (index: number) => {
    emit('remove', index);
    addVisible.value = false;
  };

  const handleMoveUp = (index: number) => {
    emit('move-up', index);
  };

  const handleMoveDown = (index: number) => {
    emit('move-down', index);
  };

  const handleShowAdd = (el: HTMLDivElement, index: number, lastIndex: number) => {
    if (index !== lastIndex) {
      addOffset.value = el.offsetTop + el.offsetHeight;
      addVisible.value = true;
    }
  };
</script> 

<template>
  <a-week-picker
      v-if="mode === 'week'"
      v-bind="pickerProps" />
  <a-month-picker
      v-else-if="mode === 'month'"
      v-bind="pickerProps" />
  <a-date-picker
      v-else
      ref="datePickerRef"
      v-bind="pickerProps" />
</template>
<script setup lang="ts">
  import dayjs, { Dayjs } from 'dayjs';
  import { computed, PropType, ref, useAttrs, watch } from 'vue';

  const convertValue = (value: Date | number, format: string, mode: Mode): any => {
    if (!value) {
      return undefined;
    }
    if (mode === 'year') {
      return dayjs().set('year', value as number);
    }
    if (typeof value === 'string') {
      return dayjs(value, format);
    } else if (typeof value === 'number') {
      return dayjs(value);
    } else {
      return dayjs(value);
    }
  };

  const convertValueBack = (value: Dayjs | undefined, mode: Mode): Date | number => {
    if (value === undefined || value === null) {
      return null;
    } else {
      if (mode === 'year') {
        return value.year();
      }
      if (mode === 'month') {
        return value.set('date', 1).set('hour', 0)
            .set('minute', 0).set('seconds', 0)
            .set('milliseconds', 0)
            .toDate();
      }
      return value.toDate();
    }
  };

  type Mode = 'year' | 'week' | 'month' | 'date' | 'datetime';

  defineOptions({
    name: 'DDatePicker',
    inheritAttrs: false
  });

  const props = defineProps({
    value: {
      type: [String, Object, Number]
    },
    mode: { type: String as PropType<Mode>, default: 'date' },
    format: String
  });

  const emit = defineEmits(['update:value', 'change']);
  const attrs = useAttrs();

  const currentValue = ref<Dayjs>(null);
  const datePickerRef = ref();
  const open = ref(false);

  const localFormat = computed(() => {
    switch (props.mode) {
      case 'year':
        return 'YYYY';
      case 'date':
        return 'YYYY-MM-DD';
      case 'datetime':
        return props.format || 'YYYY-MM-DD HH:mm:ss';
    }
    return undefined;
  });

  const realMode = computed(() => {
    if (props.mode === 'datetime') {
      return undefined;
    }
    return props.mode;
  });

  watch(() => props.value, (value: any) => {
    const convertedValue = convertValue(value, localFormat.value, props.mode);
    if (currentValue.value === null || currentValue.value === undefined) {
      currentValue.value = convertedValue;
    } else if (!convertedValue) {
      currentValue.value = null;
    } else if (currentValue.value.toString() !== convertedValue.toString()) {
      currentValue.value = convertedValue;
    }
  }, { immediate: true });

  watch(() => currentValue.value, (value) => {
    const val = convertValueBack(value, props.mode);
    emit('update:value', val);
    emit('change', val);
  });

  const updateCurrentValue = (value) => {
    currentValue.value = value;
  };

  const onPanelChange = (value: Dayjs) => {
    if (props.mode === 'year') {
      currentValue.value = value;
      open.value = false;
    }
  };

  const onOpenChange = (o) => {
    open.value = o;
  };

  // 计算所有属性和事件处理
  const pickerProps = computed(() => {
    const result: Record<string, any> = {
      ...attrs,
      value: currentValue.value,
      showTime: props.mode === 'datetime',
      format: localFormat.value,
      open: open.value,
      'onUpdate:value': updateCurrentValue,
      onPanelChange,
      onOpenChange
    };

    if (props.mode !== 'datetime' && props.mode !== 'week' && props.mode !== 'month') {
      result.picker = realMode.value;
    }

    return result;
  });
</script> 

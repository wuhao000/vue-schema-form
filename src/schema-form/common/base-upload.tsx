import {computed, PropType, ref, watch} from 'vue';
import {part} from '../utils/object';
import {cloneDeep} from 'lodash';
import { isNotNull } from '../utils/utils';

interface SimpleFile {
  name?: string;
  url?: string;
  size?: number;
  type?: string;
  uid?: string;
}

const DEFAULT_FIELDS = ['name', 'uid', 'size', 'type', 'url'];

export const baseUpdateProps = {
  mode: String as PropType<'card' | 'dragger' | 'picture'>,
  multiple: {type: Boolean, default: false},
  valueType: {
    type: String as PropType<'string' | 'object'>,
    default: 'string'
  },
  objectFields: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  value: [String, Object, Array] as PropType<string | SimpleFile | string[] | SimpleFile[]>
};
export const useBaseUpload = (props, {emit}) => {
  const fileList = ref([]);
  const previewUrl = ref(null);
  const localProps = computed(() => {
    const obj: any = Object.assign({}, props);
    if (props.mode === 'card') {
      obj.listType = 'picture-card';
    } else if (props.mode === 'dragger') {
      obj.drag = true;
      delete obj.listType;
    } else if (props.mode) {
      obj.listType = props.listType;
    }
    if (!obj.limit) {
      if (!props.multiple) {
        obj.limit = 1;
      }
    }
    if (!obj.showFileList && props.mode === 'picture') {
      obj.showFileList = false;
    }
    if (!obj.showUploadList && props.mode === 'picture') {
      obj.showUploadList = false;
    }
    obj.multiple = props.multiple;
    return obj;
  });
  watch(() => fileList.value, value => {
    if (value.some(it => !it.url)) {
      return;
    }
    let simpleValue = null;
    if (props.multiple) {
      simpleValue = value.filter(it => isNotNull(it)).map(it => {
        return props.valueType === 'string' ? it.url : part(it,  [...DEFAULT_FIELDS, ...props.objectFields]) as SimpleFile;
      });
    } else if (value.length) {
      simpleValue = props.valueType === 'string' ? value[0].url : part(value[0], [...DEFAULT_FIELDS, ...props.objectFields]) as SimpleFile;
    }
    emit('update:value', simpleValue);
  }, {deep: true});
  watch(() => props.value, (value) => {
    const urls = fileList.value?.map(it => it.url) ?? [];
    if (props.multiple) {
      if (!value || !value.length) {
        fileList.value = [];
      } else if (props.valueType === 'object') {
        fileList.value = value.filter(it => isNotNull(it)).map(it => cloneDeep(it));
      } else {
        value.filter(it => isNotNull(it)).forEach((v, index) => {
          if (props.valueType === 'string') {
            if (!urls.includes(v)) {
              fileList.value.push({
                url: v,
                uid: `file-${index}`,
                name: `file-${index}`
              });
            }
          } else if (!urls.includes(v.url)) {
            fileList.value.push(cloneDeep(v));
          }
        });
      }
    } else if (!value) {
      fileList.value = [];
    } else if (props.valueType === 'string') {
      if (!urls.includes(value)) {
        fileList.value = [{
          url: value,
          uid: 'file-0',
          name: 'file-0'
        }];
      }
    } else if (!urls.includes(value.url)) {
      fileList.value = [cloneDeep(value)];
    }
  }, {immediate: true});
  return {
    fileList,
    previewUrl,
    props: localProps
  };
};

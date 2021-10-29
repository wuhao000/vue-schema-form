import {Prop} from 'vue';

export const baseUpdateProps: {
  mode: Prop<string>;
  multiple: Prop<boolean>;
  value: Prop<any>;
  valueType: Prop<'string' | 'object'>;
};
export const useBaseUpload: ($props, {emit}) => {
  fileList: any;
  previewUrl: any;
  props: any;
  urlProp: any;
};

export interface AntUploadObject {
  file: AntUploadFile;
  fileList: AntUploadFile[];
}

export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';


export interface AntUploadFile<T = any> {
  uid: string;
  size?: number;
  name: string;
  fileName?: string;
  lastModified?: number;
  lastModifiedDate?: Date;
  url?: string;
  status?: UploadFileStatus;
  percent?: number;
  thumbUrl?: string;
  originFileObj?: any;
  response?: T;
  error?: any;
  linkProps?: any;
  type?: string;
  xhr?: T;
  preview?: string;
}

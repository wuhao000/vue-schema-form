import {ComponentPublicInstance} from '@vue/runtime-core';
import {HTMLAttributes, Ref, VNode} from 'vue';

type Key = string | number;

interface Attributes {
  key?: Key;
}

type LegacyRef<T> = string | Ref<T>;


interface ClassAttributes<T> extends Attributes {
  ref?: LegacyRef<T>;
  slot: string;
  'v-show': any;
}


type DetailedHTMLProps<E extends HTMLAttributes, T> = ClassAttributes<T> & E;

declare global {
  namespace JSX {

    interface WebViewHTMLAttributes<T> extends HTMLAttributes {
      allowFullScreen?: boolean;
      allowpopups?: boolean;
      autoFocus?: boolean;
      autosize?: boolean;
      blinkfeatures?: string;
      disableblinkfeatures?: string;
      disableguestresize?: boolean;
      disablewebsecurity?: boolean;
      guestinstance?: string;
      httpreferrer?: string;
      nodeintegration?: boolean;
      partition?: string;
      plugins?: boolean;
      preload?: string;
      src?: string;
      useragent?: string;
      webpreferences?: string;
    }

    interface IntrinsicElements {
      template: any;
      div: any;
    }

    interface AnchorHTMLAttributes<T> extends HTMLAttributes {
      download?: any;
      href?: string;
      hrefLang?: string;
      media?: string;
      ping?: string;
      rel?: string;
      target?: string;
      type?: string;
      referrerPolicy?: string;
    }

    // tslint:disable no-empty-interface
    interface Element extends VNode {
    }

    // tslint:disable no-empty-interface
    interface ElementClass extends ComponentPublicInstance {
    }

    // tslint:disable-next-line:no-empty-interface
    interface IntrinsicAttributes {
    }

    // tslint:disable-next-line:no-empty-interface
    interface IntrinsicClassAttributes<T> {
    }

  }
}

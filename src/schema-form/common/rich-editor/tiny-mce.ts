/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const getGlobal = (): any => (typeof window !== 'undefined' ? window : global);

const getTinymce = () => {
  const global = getGlobal();

  return global && global.tinymce ? global.tinymce : null;
};

export { getTinymce };

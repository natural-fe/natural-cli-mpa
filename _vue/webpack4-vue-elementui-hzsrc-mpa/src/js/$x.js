import CONST from './CONST.js'
import StorageUtil from './utils/storageUtil.js'
import platform from './utils/platform.js'
import tokenUtil from './utils/tokenUtil.js'
import domUtil from './utils/domUtil.js'
import msgDialog from './utils/msgDialog.js'
import httpUtil from './utils/httpUtil.js'
import frequence from './utils/frequence';

const util = {
    clone(obj, deep) {
        if (!obj) return obj;
        if (deep) return JSON.parse(JSON.stringify(obj));
        return Array.isArray(obj) ? obj.slice(0) : Object.assign({}, obj)
    },
    noop() {
    }
}

var mixed = {
    plat: platform.getPlat(),
    ...util,
    ...frequence,
    ...msgDialog,
    ...httpUtil,
    storageUtil: new StorageUtil(),
    CONST,
    tokenUtil,
}

Object.assign(domUtil, mixed)

export default domUtil

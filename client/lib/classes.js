import {isObject} from './f'

export function classnames(x) {
    return !isObject(x)
        ? x
        : x.filter(x => !!x).join(' ')
}

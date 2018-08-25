import {isObject} from '@app/lib/f'

export const getMessage = (messageOrObject) => {
    return isObject(messageOrObject)
        ? messageOrObject.message
        : messageOrObject
}

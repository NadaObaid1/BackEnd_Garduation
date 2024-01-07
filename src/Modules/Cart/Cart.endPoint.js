import {roles} from '../../Middlware/Auth.js'

export const endPoint = {
    create : [roles.User],
    delete: [roles.User],
    clear: [roles.User],
    get: [roles.User],
    put: [roles.User]
}
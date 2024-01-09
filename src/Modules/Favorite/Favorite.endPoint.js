import {roles} from '../../Middlware/Auth.js'

export const endPoint = {
    create : [roles.User],
    delete: [roles.User],
    get: [roles.User],
    clear: [roles.User],
}
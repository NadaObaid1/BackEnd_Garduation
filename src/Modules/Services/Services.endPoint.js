import { roles } from "../../MiddelWare/Auth.js"

export const endPoint = {
getServices: [roles.User],
getDetailsServices: [roles.User],
create: [roles.Admin],
update: [roles.Admin],
softDelete: [roles.Admin],
restore: [roles.Admin],
hardDelete: [roles.Admin]
}
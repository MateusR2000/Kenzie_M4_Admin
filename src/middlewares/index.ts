import { handleErrors } from "./handleErrors";
import validateBody from "./validateBody.middleware";
import verifyToken from "./verifyToken.middleware";
import isAdmin from "./isAdmin.middleware";
import verifyUserPermission from "./verifyPermission.middleware";
import validateId from "./validateId.middleware";
import { uniqueEmail } from "./uniqueEmail.middleware";

export default { 
    handleErrors, 
    validateBody, 
    uniqueEmail,
    verifyToken,
    isAdmin,
    verifyUserPermission,
    validateId
};
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const mail = () => {
    const token = Cookies.get("user_token");
    const decodedToken = jwt_decode(token);
    const email = decodedToken.email;
    return email;
}

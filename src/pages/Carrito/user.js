import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const mail = () => {
    const token = Cookies.get("user_token");
    console.log("Token:", token);
    
    const decodedToken = jwt_decode(token);
    console.log("Decoded Token:", decodedToken);
    
    const email = decodedToken.email;
    return email;
  }
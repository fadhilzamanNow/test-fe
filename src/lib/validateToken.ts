import { jwtDecode } from "jwt-decode";
import { decode } from "punycode";
import { ProfileState } from "../app/lib/store/profileSlice";

interface ProfileResponse {
userId : string, 
ist : number
}

const validateTokenHandler = (token: string) : ProfileResponse | void => {
  try {
    const decodedToken = jwtDecode<ProfileResponse>(token);
    console.log(decodedToken)

    return decodedToken
   /*  const isNotExpired =
      Number(Date.now() / 1000) < Number(decodedToken.exp as number);
    if (isNotExpired) {
      return Number((decodedToken.exp as number) * 1000) - Number(Date.now());
    } else {
      return false;
    } */
  } catch (e) {
    console.log(e)
  }
};

export { validateTokenHandler };

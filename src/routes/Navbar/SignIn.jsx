import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

// const CLIENT_ID =
//   "790445088727-eteehqoqngm4q823mt8i0281fj2uch3g.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";

export default function SignIn({setUserCredentials}) {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        var decoded = jwtDecode(credentialResponse.credential);
        console.log(decoded);
        setUserCredentials(decoded);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
      useOneTap
      size="medium"
      ux_mode="popup"
    />
  );
}
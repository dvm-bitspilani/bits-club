import { GoogleLogin } from "@react-oauth/google";

// const CLIENT_ID =
//   "790445088727-eteehqoqngm4q823mt8i0281fj2uch3g.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";

export default function SignIn() {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        localStorage.setItem("token", credentialResponse.credential);
        window.location.reload();
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

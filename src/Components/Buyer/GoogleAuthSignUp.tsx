import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { gsignup,login } from "../../Api/buyer";
import { setCredentials } from "../../Store/slice/authSlice";

interface googleAuthProps {
  buyerLogin: boolean;
  buyer: boolean;
}

interface decodeJWT{
    name:string,
    email:string,
    password:string
}

const GoogleAuthSignUp = ({ buyerLogin, buyer }: googleAuthProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gSignUp = async (res: CredentialResponse) => {
    const result: decodeJWT = jwtDecode(res.credential as string);
    console.log(result);
    const data = {
      name: result.name,
      email: result.email,
      password: "@googleVacationVista",
      isGoogle: true,
    };
    if (buyer) {
      if (!buyerLogin) {
        const response = await gsignup(data.name, data.email, data.password);
        console.log(response);
        if (!response?.data.data) {
          toast.error("email already exist. Please login");
          navigate("/login");
        } else {
          toast.success("Registration successful. Please login");
          navigate("/login");
        }
      } else {
        const res=await login(data.email,data.password)
        console.log('1',res)
        if (!res?.data.success) {
          toast.error("User not found. Please sign up");
          navigate("/signup");
        } else {
          toast.success("logged in successfully");
          dispatch(setCredentials(res.data.token));
          navigate("/");
        }
      }
    } else {
      //seller login and signup
    }
  };
  return(
    <>
    <div className="flex justify-center">
  <div style={{ width: "350px" }}> {/* Adjust width as needed */}
    <GoogleLogin
      onSuccess={(credentialsResponse) => {
        gSignUp(credentialsResponse);
      }}
      onError={() => {
        console.log("login failed");
      }}
    />
  </div>
</div>
    </>
  )
};

export default GoogleAuthSignUp
import createContext from "./createContext";
import woynexApi from "../api/woynexApi";
import constants from "../common/constants";
import { makeToast } from "../utils/makeToast";

const initialState = {
  isLoggedIn: false,
  googleAuth: false,
  smsAuth: false,
  indicator: false,
  newUserData: {},
  userData: {},
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: action.payload };
    case "SET_USER_DATA":
      return { ...state, userData: action.payload };
    case "REGISTER_USER_DATA":
      return { ...state, newUserData: action.payload };
    case "SET_INDICATOR":
      return { ...state, indicator: action.payload };
    case "SET_GOOGLE_AUTH":
      return { ...state, googleAuth: action.payload };
    case "SET_SMS_AUTH":
      return { ...state, smsAuth: action.payload };
    case "SET_AFTER_SUCCESS_LOGIN":
      return {
        ...state,
        isLoggedIn: action.payload.login,
        googleAuth: action.payload.google,
        smsAuth: action.payload.sms,
        userData: action.payload.dataOfUser,
      };
    default:
      return state;
  }
};

// #####################################################################
// ########################## Login ####################################
// #####################################################################
const _loginHandler = (dispatch) => async (payload) => {
  dispatch({ type: "SET_INDICATOR", payload: true });

  const userData = {
    isGoogleAuthticator: false,
    isSmsAuthentication: false,
  };

  setTimeout(() => {
    dispatch({
      type: "SET_AFTER_SUCCESS_LOGIN",
      payload: {
        login: true,
        google: userData.isGoogleAuthticator,
        sms: userData.isSmsAuthentication,
        dataOfUser: userData,
      },
    });

    dispatch({ type: "SET_INDICATOR", payload: false });
  }, 3000);

  /*
    try {
        const response = await woynexApi.post(constants.LoginUrl, payload)
        if (response.data.success) {
            const { data: { data: userData } } = response
            dispatch({ type: 'SET_AFTER_SUCCESS_LOGIN', payload: { login: true, google: userData.isGoogleAuthticator, sms: userData.isSmsAuthentication, dataOfUser: userData } });
            //dispatch({ type: 'LOGIN', payload: true });
            //dispatch({ type: 'SET_GOOGLE_AUTH', payload: userData.isGoogleAuthticator });
            //dispatch({ type: 'SET_SMS_AUTH', payload: userData.isSmsAuthentication });

            /**
             * @TODO
             * otp devreye girdiğinde alttaki iki satır onların da altındaki if durumunun içine girecek
             ********
            // dispatch({ type: 'SET_USER_DATA', payload: userData });
            setWithExpiry(userData)
            if (!userData.isGoogleAuthticator && !userData.isSmsAuthentication) {
                // setWithExpiry(userData)
                // dispatch({ type: 'SET_USER_DATA', payload: userData });
                // dispatch({ type: 'LOGIN', payload: true });
                //makeToast("success", response.data.message)
            }
        } else {
            makeToast("error", response.data.message)
        }
        dispatch({ type: 'SET_INDICATOR', payload: false });

    } catch (error) {
        console.log("An error occured while attempting login :", error.response)
        dispatch({ type: 'SET_INDICATOR', payload: false });
        //console.log("parsed", JSON.parse(error?.response?.data?.Errors[0].Message).error_description)
        makeToast("error", "E-posta adresi veya şifre hatalı")
    }
    */
};

// #####################################################################
// ########################## 2FA ######################################
// #####################################################################
const _twoFaHandler = (dispatch) => async (payload, history) => {
  dispatch({ type: "SET_INDICATOR", payload: true });
  const tempOtpCode = "123456";
  try {
    setTimeout(() => {
      if (payload === tempOtpCode) {
        /**
         * @TODO
         * girilen code backend'den success döndürdüğünde
         * kullanıcı bilgilerini token ile beraber al state'e set et ve kullanııyı içeri al
         */
        history.push("/");
      } else {
        makeToast("error", "Invalid code! Please try again");
      }

      dispatch({ type: "SET_INDICATOR", payload: false });
    }, 3500);
  } catch (error) {
    console.log("An error occured while attempting login :", error.response);
    dispatch({ type: "SET_INDICATOR", payload: false });
  }
};

/**
 *
 * logged In time is set to 1 hour!
 */
function setWithExpiry(userData) {
  const now = new Date();
  const hours = 1 * 60 * 60 * 1000;
  userData.expiry = now.getTime() + hours;
  const stringified = JSON.stringify(userData);
  localStorage.setItem("user", stringified);
}

// #####################################################################
// ################# Keep logged in after page refresh #################
// #####################################################################
const _persistLoggedIn = (dispatch) => async (userData) => {
  dispatch({ type: "SET_USER_DATA", payload: userData });
  dispatch({ type: "LOGIN", payload: true });
};

// #####################################################################
// ########################## Logout ###################################
// #####################################################################
const _logoutHandler = (dispatch) => async (history) => {
  dispatch({ type: "SET_USER_DATA", payload: {} });
  dispatch({ type: "LOGIN", payload: false });
  localStorage.removeItem("user");
  history.push("/login");
};

const _logoutAndClearStorage = (dispatch) => async () => {
  dispatch({ type: "SET_USER_DATA", payload: {} });
  dispatch({ type: "LOGIN", payload: false });
  localStorage.clear();
};

// #####################################################################
// ########################## Signup ###################################
// #####################################################################
const _signupHandler = (dispatch) => async (payload, history) => {
  dispatch({ type: "SET_INDICATOR", payload: true });

  try {
    const response = await woynexApi.post(constants.RegisterUrl, payload);
    //console.log("response: ", response)
    if (response.data.success) {
      dispatch({ type: "REGISTER_USER_DATA", payload: response.data.data });
      makeToast("success", response.data.message);
      setTimeout(() => {
        history.push("/login");
      }, 3200);
    } else {
      response.data.errors.map((err) => {
        makeToast("error", err.message);
      });
    }
    dispatch({ type: "SET_INDICATOR", payload: false });
  } catch (error) {
    console.log("An error occured while attempting register :", error.response);
    dispatch({ type: "SET_INDICATOR", payload: false });
    //makeToast("error", "Bir hata meydana geldi")
  }
};

// #####################################################################
// ########################## Create Sub Account #######################
// #####################################################################
const _createSubAccount = (dispatch) => async (payload) => {
  dispatch({ type: "SET_INDICATOR", payload: true });

  try {
    const response = await woynexApi.post(constants.RegisterUrl, payload);
    //console.log("response: ", response)
    if (response.data.success) {
      dispatch({ type: "REGISTER_USER_DATA", payload: response.data.data });
      makeToast("success", response.data.message);
    } else {
      makeToast("error", "Eposta adresi kullanılıyor. Başka bir eposta deneyin");
    }
    dispatch({ type: "SET_INDICATOR", payload: false });
  } catch (error) {
    //console.log("An error occured while creating a sub account :", error.response)
    dispatch({ type: "SET_INDICATOR", payload: false });
    if (!error.response.data.Success) {
      error.response.data.Errors.map((err) => {
        makeToast("error", err.Message);
      });
    }
  }
};

export const { Provider, Context } = createContext(
  authReducer,
  {
    _loginHandler,
    _signupHandler,
    _logoutHandler,
    _persistLoggedIn,
    _logoutAndClearStorage,
    _createSubAccount,
    _twoFaHandler,
  },
  initialState
);

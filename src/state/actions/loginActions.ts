import * as ACTIONS from "../../constants/actions/loginActions";
import {changeLogin} from "../actionTypes/loginActionTypes";
import {ILogin} from "../../types/ILogin";

export function changeLoginState(loginDetails: ILogin): changeLogin {
  return {
    type: ACTIONS.CHANGE_LOGIN,
    payload: loginDetails
  }
}
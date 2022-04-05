import {changeLogin} from "../actionTypes/loginActionTypes";
import * as ACTIONS from "../../constants/actions/loginActions";
import {ILogin} from "../../types/ILogin";

const InitLoginState: ILogin = { login: false, type: null};

export function loginReducer(state: ILogin = InitLoginState, action: changeLogin): ILogin {
  switch (action.type) {
    case ACTIONS.CHANGE_LOGIN:
      return {
        login: action.payload.login,
        type: action.payload.type
      }
    default: {
      return state;
    }
  }
}
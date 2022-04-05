import * as ACTIONS from "../../constants/actions/loginActions";
import {ILogin} from "../../types/ILogin";

export interface changeLogin {
  type: typeof ACTIONS.CHANGE_LOGIN
  payload: ILogin
}
import React, {useEffect} from "react";
import Routing from "./components/routes/Routes";
import {useMutation} from "@apollo/client";
import {useDispatch} from "react-redux";
import {GET_USER_BY_TOKEN} from "./graphQl/users/userMutation";
import {changeLoginState} from "./state/actions/loginActions";

const ClientApp: React.FC = () => {
  const dispatch = useDispatch();
  const [getUserByToken] = useMutation(GET_USER_BY_TOKEN);
  useEffect(() => {
    const token: string | null = localStorage.getItem('token');
    if (!token) {
      return;
    }
    getUserByToken({
      variables: {
        token: token
      }
    }).then(({data}) => {
      dispatch(changeLoginState({login: true, type: data.getUserByToken.type}));
    });
  }, [dispatch, getUserByToken]);

  return (
    <Routing/>
  );
}

export default ClientApp;
import React, {useState} from 'react';
import Select from "react-select";
import {IOrderState} from "../../types/IOrder";
import {useMutation} from "@apollo/client";
import {useDispatch} from "react-redux";
import {changeOrderState} from "../../state/actions/orderActions";
import {CHANGE_ORDER_STATUS} from "../../graphQl/orders/orderMutation";
import {confirmationBox, DetailBox, toast} from "../sweetalert/sweetalert";
import {styleSelect} from "../createProduct/CreateProductConstants";

type ChangeStateProps = {
  status: string
  id: string
  orderCode: string
}
const ChangeState: React.FC<ChangeStateProps> = (props) => {
  const {status, id, orderCode} = props;
  const dispatch = useDispatch();
  const upperCase = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  const [state, setState] = useState<IOrderState>({value: upperCase(status), label: upperCase(status)});
  const [changeOrderStatus] = useMutation(CHANGE_ORDER_STATUS);

  const isMenuDisabled = (status: string) => {
    return !(status === 'requested');
  }
  const stateOptions = (state: string) => {
    if (state === 'requested') {
      return [{value: 'Approve', label: 'Approve'}, {value: 'Reject', label: 'Reject'}]
    } else {
      return []
    }
  }

  const handleOnStateChanged = (selectState: IOrderState | null) => {
    if (!selectState) {
      return;
    }
    confirmationBox('Are You sure to change state of order : ' + orderCode + ' to ' + selectState.label,
      'Yes, change it!',
      'No',
      'You won\'t be able to revert this!',
      'question').then(({isConfirmed}) => {
      if (isConfirmed) {
        changeOrderStatus({
          variables: {
            id: id,
            newState: (selectState.value === 'Approve') ? 'approved' : 'rejected'
          }
        }).then(({data}) => {
          if (data.changeOrderStatus.changed) {
            setState(selectState)
            dispatch(changeOrderState({
              id: data.changeOrderStatus.order.id,
              newState: data.changeOrderStatus.order.status
            }));
            toast('Order :' + data.changeOrderStatus.order.orderCode + ' status change to ' +
              data.changeOrderStatus.order.status + ' successfully', '', "success");
            setState({
              value: upperCase(data.changeOrderStatus.order.status),
              label: upperCase(data.changeOrderStatus.order.status)
            });
          } else {
            DetailBox('Failed to change state', data.changeOrderStatus.productErrorMessages, 'error');
          }
        }).catch((error) => {
          toast('Failed to change state', '', 'error');
        });
      }
    });
  }
  return (
    <React.Fragment>
      <Select
        value={state}
        styles={styleSelect}
        isDisabled={isMenuDisabled(status)}
        options={stateOptions(status)}
        onChange={(selected: IOrderState | null) => {
          handleOnStateChanged(selected)
        }}/>
    </React.Fragment>
  );
};

export default ChangeState;
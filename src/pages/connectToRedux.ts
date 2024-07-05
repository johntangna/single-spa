import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import { setUserId } from "../store/userSlice";

export function ConnectToRedux(WrapperComponent: any) {

  const mapStateToProps = (state: App.ReducerType) => ({
    userId: state.user.userId,
  })

  const mapDispatchToProps = (dispatch: Dispatch<Action<string>>) => ({
    setUserId: (payload: Record<"userId", string>) => dispatch(setUserId(payload)),
  })


  return connect(mapStateToProps, mapDispatchToProps)(WrapperComponent)
}
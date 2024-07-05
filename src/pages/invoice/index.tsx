import { h } from "../.."
import { ConnectToRedux } from "../connectToRedux"

type Props = {

} & App.ReduxProps

function Invoice(props: Props) {
  return (
    <div>23</div>
  )
}

export default ConnectToRedux(Invoice)
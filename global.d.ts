declare namespace App {
  type AppRoute = {
    index?: boolean
    path: string
    element?: ReactNode
    children?: AppRoute[]
    isAuth?: boolean
  }

  type ReducerType = {
    user: Reducer<State>
  }

  type ReduxProps = {
    userId: string
    setUserId: (userId: string) => void
  }
}
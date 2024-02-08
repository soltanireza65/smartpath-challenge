import { Navigate } from 'react-router-dom'

type Props = {}

const NotFoundPage = (props: Props) => {
  return (
    <Navigate to={"/"} />
  )
}

export default NotFoundPage
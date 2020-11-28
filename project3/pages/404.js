import {Error} from "./_error.js"
import withLayout from '../components/layout'

const Custom404 = (props) => {

  return (
    <Error statusCode={404} title='Page Not Found.' />
  )
}

export default withLayout(Custom404, 'white');
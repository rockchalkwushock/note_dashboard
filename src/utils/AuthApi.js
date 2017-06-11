import axios from 'axios'

/**
 * NOTE: Necessary for running async action tests
 * because Webpack is not being used by Jest there
 * is no access to any user defined environment
 * variables at runtime.
 */
/* istanbul ignore else */
if (process.env.NODE_ENV === 'test') {
  require('dotenv-safe').load()
}

axios.defaults.baseURL = process.env.API_URL

export default class AuthApi {
  signIn = async input => {
    try {
      const { data } = await axios.post('/users/sign-in', input)
      axios.defaults.headers.common['Authorization'] = data.token // eslint-disable-line
      // TODO: push to '/'
      return data
    } catch (e) {
      return e.response.data
    }
  }
  signOut = () => {
    const data = {
      _id: null,
      token: null
    }
    axios.defaults.headers.common['Authorization'] = '' // eslint-disable-line
    // TODO: redirect to '/login'
    return data
  }
  signUp = async input => {
    try {
      const { data } = await axios.post('/users/sign-up', input)
      axios.defaults.headers.common['Authorization'] = data.token // eslint-disable-line
      // TODO: push to '/'
      return data
    } catch (e) {
      return e.response.data
    }
  }
}

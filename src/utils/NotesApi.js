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

export default class NotesApi {
  create = async input => {
    try {
      const { data } = await axios.post('/notes', input)
      return data
    } catch (e) {
      return e.response.data
    }
  }
  delete = async id => {
    try {
      const { data } = await axios.delete(`/notes/${id}`)
      return data
    } catch (e) {
      return e.response.data
    }
  }
  edit = async (input, id) => {
    try {
      const { data } = await axios.patch(`/notes/${id}`, input)
      return data
    } catch (e) {
      return e.response.data
    }
  }
  getNote = async id => {
    try {
      const { data } = await axios.get(`/notes/${id}`)
      return data
    } catch (e) {
      return e.response.data
    }
  }
  getAll = async () => {
    try {
      const { data } = await axios.get('/notes')
      return data
    } catch (e) {
      return e.response.data
    }
  }
}

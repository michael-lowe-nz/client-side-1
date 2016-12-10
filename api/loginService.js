import request from 'superagent'
import getLifestyles from '../api/getLifestyles'
import getFlops from '../api/getFlops'
import getCurrentUser from '../api/getCurrentUser'


module.exports = (dispatch, userInfo) => {

  dispatch({type: 'LOGIN_INIT'})

  request
    .post('https://topoftheflops.herokuapp.com/api/v1/users/login')
    .send(userInfo)
    .end((err, res) => {
      if (err) {
        dispatch({type: 'LOGIN_UNSUCCESSFUL'})
      } else {
        getLifestyles(dispatch)
        getFlops(dispatch)
        getCurrentUser(dispatch, 3) // This is hard coded, where do we get the id of the user from when signing in?
        dispatch({type: 'LOGIN_SUCCESSFUL', payload: res.body})
        dispatch({type: 'CHANGE_PAGE', payload: '/dashboard'})
      }
  })
}

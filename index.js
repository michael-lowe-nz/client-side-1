import React from 'react'
import { render } from 'react-dom'
import {createStore} from 'redux'
import reducer from './reducer'
import sheetRouter from 'sheet-router'
import history from 'sheet-router/history'
import href from 'sheet-router/href'

import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Flops from './components/Flops'
import CreateLifestyle from './components/CreateLifestyle'
import CreateFlop from './components/CreateFlop'
import Profile from './components/Profile'
import Signup from './components/Signup'
import Unauthenticated from './components/Unauthenticated'
import SingleFlop from './components/SingleFlop'
import EditProfile from './components/EditProfile'

const main = document.querySelector('main')

var initialState = {
  loginInfo: {username: '', password: '', bio: '', profilePic: ''},
  currentPage: '/',
  currentLifestyleId: 1,
  lifestyles: [],
  flops: [],
  currentUser: {},
  allUsers: null,
  currentViewUserId: null,
  viewSingleFlopId: null
}

const {dispatch, getState, subscribe} = createStore(reducer, initialState)

const route = sheetRouter({default: '/404'}, [
  ['/', (params) => Login],
  ['/signup', (params) => Signup],
  ['/lifestyles', (params) => Dashboard],
  ['/flops', (params) => Flops],
  ['/flops/:id', (params) => SingleFlop],
  ['/lifestyles/new', (params) => CreateLifestyle],
  ['/flops/new', (params) => CreateFlop],
  ['/profile/:username', (params) => Profile],
  ['/profile/:username/edit', (params) => EditProfile],
  ['/unauthenticated', (parmas) => Unauthenticated]
])

history(function (href) {
  dispatch({type: 'CHANGE_PAGE', payload: href.pathname})
})

subscribe(() => {
  const currentPage = getState().currentPage
  if(window.location.href !== currentPage){
    window.history.pushState({}, null, currentPage)
  }
  var Component = route(currentPage)
  render(<Component state={getState()} dispatch={dispatch} />, main)
})

dispatch({type: 'INIT'})

import React from 'react'

import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import posed, { PoseGroup } from 'react-pose'
import shortid from 'shortid'

import AppHeader from './AppHeader'
import Todos from './todos/Todos'
import Books from './books/Books'
import Movies from './movies/Movies'

const AnimationWrapper = posed.div({
  enter: {
    opacity: 1,
    y: 0,
    staggerChildren: 50,
    beforeChildren: true,
    delay: 300
  },
  exit: {
    opacity: 0,
    y: 90,
    staggerChildren: 20,
    staggerDirection: -1
  }
})

function App ({ location, history }) {
  return (
    <>
      <AppHeader history={history} />
      <main className='container mt-45'>
        <PoseGroup>
            <AnimationWrapper key={shortid.generate()}>
              <Switch location={location}>
                <Route path="/todos" component={Todos} />
                <Route path="/books" component={Books} />
                <Route path="/movies" component={Movies} />
                <Redirect to="/todos" />
              </Switch>
            </AnimationWrapper>
          </PoseGroup>
      </main>
    </>
  )
}

export default withRouter(App)

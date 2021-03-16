import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './Store/reducer';
import Home from './Pages/Home';
import Stories from './Pages/Stories';
import EIA from './Pages/EIA';
import { PageUrls } from './Utility/helper';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {/* <Route path={PageUrls.STORIES}  exact component={Stories} /> */}
          <Route path={PageUrls.HOME}  exact component={EIA} />
          {/* <Route path={PageUrls.HOME} exact component={Home} /> */}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

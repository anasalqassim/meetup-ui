import { Route, Switch } from 'react-router-dom';

import AllMeetupsPage from './pages/AllMeetups';
import NewMeetupPage from './pages/NewMeetup';
import FavoritesPage from './pages/Favorites';
import Layout from './components/layout/Layout';
import SignUp from './pages/SignUp';
import Login from './pages/Login';


function App() {
  
  
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <AllMeetupsPage />
        </Route>
        <Route path='/new-meetup'>
          <NewMeetupPage />
        </Route>
        <Route path='/favorites'>
          <FavoritesPage />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <SignUp />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

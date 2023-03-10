import { useContext } from 'react';

import FavoritesContext from '../store/favorites-context';
import MeetupList from '../components/meetups/MeetupList';
import { useAuthContext } from '../hooks/useAuthContext';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';


function FavoritesPage() {
  const favoritesCtx = useContext(FavoritesContext);
  let content;

  const history = useHistory()
  const {user} = useAuthContext()
  if(!user){
    history.replace('/login')
  }
  

  

  if (favoritesCtx.totalFavorites === 0) {
    content = <p>You got no favorites yet. Start adding some?</p>;
  } else {
    const data = favoritesCtx.favorites
    console.log(data)
    content = <MeetupList meetups={data} />;
  }


  return (
    <section>
      <h1>My Favorites</h1>
      {content}
    </section>
  );
}

export default FavoritesPage;

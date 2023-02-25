import { useContext } from 'react';

import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import FavoritesContext from '../../store/favorites-context';

function MeetupItem(props) {
  const favoritesCtx = useContext(FavoritesContext);
  
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

  function toggleFavoriteStatusHandler() {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      console.log("it",props)
      favoritesCtx.addFavorite(props);
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.imgUrl} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          
          <address>{props.address}</address>
          <span>{props.meetupDate}</span>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavorite ? 'Remove from Favorites' : 'To Favorites'}
          </button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;

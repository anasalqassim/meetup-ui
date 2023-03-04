import { createContext, useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {}
});

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);
  const {user} = useAuthContext();
  

  useEffect(() =>{

 
  if(user){
  
    const config = {
      headers: { 
        Authorization: `Bearer ${user.token}`
      }
    };

    axios.get( 
      `https://meetup-backend.herokuapp.com/api/v1/meetup/favorites`,
      config
      ).then((response) => {
            const data = response.data.meetUps
            
            if(data){
              const meetups = []
            for (const key in data) {
              const meetup = {
                id: key,
                ...data[key]
              };
              meetups.push(meetup)
              
            }
            setUserFavorites(meetups)
          }
    
            
           
            
          })
      .catch((error) => {
        console.log(error)
        
      });
  }

},[user,userFavorites])
 
  function addFavoriteHandler(favoriteMeetup) {
      
    if(!itemIsFavoriteHandler(favoriteMeetup.meetupId)){
      const config = {
        headers: { 
          Authorization: `Bearer ${user.token}`
        }
      };
      axios.get( 
        `https://meetup-backend.herokuapp.com/api/v1/meetup/${favoriteMeetup.meetupId}`,
        config
        ).then((data) =>{
          console.log(data)
          setUserFavorites((prevUserFavorites) => {
      
            return prevUserFavorites.concat(favoriteMeetup);
          });
        })
        .catch((error) =>{
          console.log(error)
        })
    }
  
    
    
  }

  function removeFavoriteHandler(meetupId) {
    const config = {
      headers: { 
        Authorization: `Bearer ${user.token}`
      }
    };
  
   

    setUserFavorites(prevUserFavorites => {
      axios.delete( 
        `https://meetup-backend.herokuapp.com/api/v1/meetup/favorites/${meetupId}`,
        config
        ).then((data) =>{
          console.log(data)
          //setUserFavorites(prevUserFavorites.filter(meetup => meetup.id !== meetupId))
          
        })
        .catch((error) =>{
          console.log(error)
        })
        
      return prevUserFavorites.filter(meetup => meetup.id !== meetupId);
    });
  }

  function itemIsFavoriteHandler(meetupId) {
    return userFavorites.some(meetup => meetup.meetupId === meetupId);
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;

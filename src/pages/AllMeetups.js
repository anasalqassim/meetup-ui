import axios from 'axios';
import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import MeetupList from '../components/meetups/MeetupList';
import { useAuthContext } from '../hooks/useAuthContext';


function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  const [error, setError] = useState(null);

  
  const history = useHistory()
  const {user} = useAuthContext()
  if(!user){
    history.replace('/login')
  }
  

  useEffect(() => {
    setIsLoading(true);
  
    if(user){
  
    const config = {
      headers: { 
        Authorization: `Bearer ${user.token}`
      }
    };
    axios.get( 
      'https://meetup-backend.herokuapp.com/api/v1/meetup',
      config
      ).then((response) => {
            const data = response.data.meetUps
            if(response.data.state){
             
              if(response.data.state.startsWith('sorry')){
              
                setError(response.data.state)
              }
            }
            
            
            const meetups = [];
            if(data){
            for (const key in data) {
              const meetup = {
                id: key,
                ...data[key]
              };
    
              meetups.push(meetup);
            }
          }
    
            
            setLoadedMeetups(meetups);
            setIsLoading(false)
          })
      .catch((error) => {
        console.log(error)
        setError(error.response.data.message)
        setIsLoading(false)
      });
  }
    
  
    
    
    
  }, [user]);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      
      {error && <Alert variant='danger'>{error}</Alert>}
      
      { loadedMeetups &&
        (
          <MeetupList meetups={loadedMeetups} />
        )
      }
      
    </section>
  );
}

export default AllMeetupsPage;

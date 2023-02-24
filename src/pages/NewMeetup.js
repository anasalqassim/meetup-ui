import axios from 'axios';
import { useHistory } from 'react-router-dom';

import NewMeetupForm from '../components/meetups/NewMeetupForm';
import { useAuthContext } from '../hooks/useAuthContext';



function NewMeetupPage() {
  const history = useHistory();

  const {user} = useAuthContext()
  if(!user){
    history.replace('/login')
  }

  function addMeetupHandler(meetupData) {

    const config = {
      headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      }
    };
    const body = JSON.stringify(meetupData)
   
  
    axios.post( 
    'http://localhost:8080/api/v1/meetup',
    body,
    config
    ).then(() => {
      history.replace('/');
          
        })
    .catch(console.log);



    // fetch(
    //   'http://localhost:8080/api/v1/meetup',{
    //     method: 'POST',
    //     body: JSON.stringify(meetupData),
    //     headers: {Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmFzLmFscWFzc2ltQGdtYWlsLmNvbSIsImlhdCI6MTY3NzE5NDExNCwiZXhwIjoxNjc3MTk1NTU0fQ.CnfcH34SmaHJFJe73Eoi5Q1Al45Ne9vRImcBFTMuwdgThSKB4ks14pTznYp_Zv5bInq9QDolyELV-B5CfrTZhw',
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // ).then(() => {
      
    // });
  }

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;

import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

function MeetupList(props) {
  
  return (
    <ul className={classes.list}>
      
      {props.meetups.map((meetup) => (
       
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          imgUrl={meetup.imgUrl}
          title={meetup.title}
          address={meetup.address}
          description={meetup.description}
          meetupDate={meetup.meetDate}
        />
      ))}
    </ul>
  );
}

export default MeetupList;

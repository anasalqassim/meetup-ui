import { useEffect, useState } from "react";
import SortButton, { OrderType } from "../ui/SortButton";
import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

function sortMeetupsByDate(meetups, order) {

  const compareDates = (meetupA, meetupB) => {
    const dateA = new Date(meetupA.meetDate);
    const dateB = new Date(meetupB.meetDate);
    let result = 0;

    if (dateA < dateB) 
      result = -1;
    else if (dateA > dateB) 
      result = 1;

    if (order === OrderType.OLDEST) 
      result *= -1; // reverse the signal

    return result;
  };

  return meetups.sort(compareDates);
}

function MeetupList(props) {
  const [isSorting, setIsSorting] = useState(false);
  const [meetups, setMeetups] = useState(props.meetups);

  const handleSortChange = (order) => {
    setIsSorting(true);
    setMeetups(prevMeetups => sortMeetupsByDate([...prevMeetups], order));
  }

  // sort the list on first load incase the list is not sorted from the backend
  useEffect(() => {
    handleSortChange(OrderType.LATEST);
  }, []);

  // Whenever the sorting finishes isSorting is set to false.
  useEffect(() => {
    setIsSorting(false);
  }, [meetups]);

  console.log(meetups)
  return (
    <>
      <div className={classes.sortButtonDiv}>
        <SortButton onChange={handleSortChange}/>
      </div>
      {isSorting ? (
        <p>Sorting...</p>
      ) : (
        <ul className={classes.list}>
          {meetups.map((meetup) => (
            
            <MeetupItem
              key={meetup.meetupId}
              id={meetup.meetupId}
              meetupId = {meetup.meetupId}
              imgUrl={meetup.imgUrl}
              title={meetup.title}
              address={meetup.address}
              description={meetup.description}
              meetDate={meetup.meetDate}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default MeetupList;

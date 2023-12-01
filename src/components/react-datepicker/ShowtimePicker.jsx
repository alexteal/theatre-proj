import React, {useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ShowtimePicker = ({ showtimes, setShowtimes }) => {
  // Temporary state to hold the currently selected date and time
  const [tempDate, setTempDate] = useState(new Date());
  const [tempTime, setTempTime] = useState('');

  if (!Array.isArray(showtimes)) {
    // handle the error, maybe show a message or return null to render nothing
    console.error('showtimes is not an array', showtimes);
    return null;
  }
  

  const addShowtime = (showtimeString) => {
    if (!showtimes.includes(showtimeString)) {
      setShowtimes([...showtimes, showtimeString]);
    } else {
      alert('This showtime already exists.');
    }
  };
  
  const removeShowtime = (index) => {
    const newShowtimes = [...showtimes];
    newShowtimes.splice(index, 1);
    setShowtimes(newShowtimes);
  };
  

  // Function to format date and time into a string
  const formatShowtimeString = (date, time) => {
    return `${date.toLocaleDateString()} || ${time}`;
  };

  // Function to handle the final addition of the showtime
  const handleAddShowtime = () => {
    const formattedShowtime = formatShowtimeString(tempDate, tempTime);
    addShowtime(formattedShowtime);
  };

  return (
    <div>
      <DatePicker
        selected={tempDate}
        onChange={setTempDate}
        dateFormat="MM/dd/yyyy"
      />
      <DatePicker
        selected={tempTime ? new Date(`1970-01-01T${tempTime}Z`) : null}
        onChange={date => setTempTime(date.toTimeString().split(' ')[0])}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
      <button type="button" onClick={handleAddShowtime}>
        Add Showtime
      </button>

      {showtimes.map((showtime, index) => (
        <div key={index}>
          <span>{showtime}</span>
          <button type="button" onClick={() => removeShowtime(index)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShowtimePicker;
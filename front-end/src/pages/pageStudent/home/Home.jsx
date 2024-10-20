
const Home = () => {
  // Sample data for announcements and events
  const announcements = [
    {
      id: 1,
      title: 'Fire Drill on October 15',
      content: 'Please be informed that there will be a fire drill in the dormitory on October 15 at 10:00 AM.',
      date: '2024-10-05',
    },
    {
      id: 2,
      title: 'Dormitory Maintenance',
      content: 'Scheduled maintenance will occur on October 18. Please ensure your belongings are secure.',
      date: '2024-10-08',
    },
  ];

  const events = [
    {
      id: 1,
      title: 'Movie Night',
      date: '2024-10-12',
      time: '7:00 PM',
      location: 'Common Room',
    },
    {
      id: 2,
      title: 'Study Group',
      date: '2024-10-14',
      time: '5:00 PM',
      location: 'Library',
    },
  ];

  return (
    <div className="container mt-4">
      <h1>Welcome to Your Dormitory Portal</h1>

      {/* Announcements Section */}
      <div className="mb-4">
        <h2>Latest Announcements</h2>
        {announcements.length > 0 ? (
          announcements.map(announcement => (
            <div className="card mb-3" key={announcement.id}>
              <div className="card-body">
                <h5 className="card-title">{announcement.title}</h5>
                <p className="card-text">{announcement.content}</p>
                <p className="card-text"><small className="text-muted">Posted on: {announcement.date}</small></p>
              </div>
            </div>
          ))
        ) : (
          <p>No announcements available.</p>
        )}
      </div>

      {/* Events Section */}
      <div className="mb-4">
        <h2>Upcoming Events</h2>
        {events.length > 0 ? (
          <ul className="list-group">
            {events.map(event => (
              <li className="list-group-item" key={event.id}>
                <strong>{event.title}</strong> - {event.date} at {event.time} ({event.location})
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming events.</p>
        )}
      </div>

      {/* Useful Links Section */}
      <div className="mb-4">
        <h2>Useful Links</h2>
        <ul className="list-group">
          <li className="list-group-item"><a href="#">Dormitory Rules and Regulations</a></li>
          <li className="list-group-item"><a href="#">Report a Maintenance Issue</a></li>
          <li className="list-group-item"><a href="#">Contact Dormitory Administration</a></li>
        </ul>
      </div>
    </div>
  );
};


export default Home

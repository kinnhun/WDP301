import React from 'react';
import './Home.css'; // Đảm bảo thêm file CSS tùy chỉnh

const Home = () => {
  // Dữ liệu mẫu cho thông báo và sự kiện
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
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="mb-4 main-title">Dormitory Management System</h1>
        <p className="intro-text">
          Welcome to the Dormitory Management Portal. Find the latest announcements, events, and useful resources below.
        </p>
      </div>

      {/* Announcements Section */}
      <div className="announcements-section mb-5">
        <h2 className="mb-3 section-title">Latest Announcements</h2>
        {announcements.length > 0 ? (
          <div className="row">
            {announcements.map((announcement) => (
              <div className="col-md-6" key={announcement.id}>
                <div className="card announcement-card mb-3 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{announcement.title}</h5>
                    <p className="card-text">{announcement.content}</p>
                    <p className="card-text">
                      <small className="text-muted">Posted on: {announcement.date}</small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No announcements available at the moment.</p>
        )}
      </div>

      {/* Events Section */}
      <div className="events-section mb-5">
        <h2 className="mb-3 section-title">Upcoming Events</h2>
        {events.length > 0 ? (
          <ul className="list-group events-list">
            {events.map((event) => (
              <li className="list-group-item event-item shadow-sm" key={event.id}>
                <strong>{event.title}</strong> - {event.date} at {event.time} ({event.location})
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming events.</p>
        )}
      </div>

      {/* Useful Links Section */}
      <div className="useful-links-section mb-5">
        <h2 className="mb-3 section-title">Useful Links</h2>
        <ul className="list-group useful-links-list">
          <li className="list-group-item useful-link shadow-sm">
            <a href="#">Dormitory Rules and Regulations</a>
          </li>
          <li className="list-group-item useful-link shadow-sm">
            <a href="#">Report a Maintenance Issue</a>
          </li>
          <li className="list-group-item useful-link shadow-sm">
            <a href="#">Contact Dormitory Administration</a>
          </li>
        </ul>
      </div>

      {/* Footer Section */}
      <footer className="text-center mt-5 footer">
        <p>&copy; 2024 Dormitory Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

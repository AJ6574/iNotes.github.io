import React from 'react'

export default function Forum() {
  return (
    <section className="forum-section">
      <div className="category-container">
          <div className="forum-container">
            <h2 className="category-name">Site Announcements</h2>
          </div>
        </div>
        <div className="category-container">
          <div className="forum-container">
            <h2 className="category-name">Anime Discussions</h2>
            <li className="forum">
                <h3 className="topic"><i className='bx bxs-chat'></i> Latest Animes</h3>
              <div className='monitor'>
                <h4 className="discussion-count">Discussions: 200</h4>
                <h4 className='message-count'>Messages: 4013</h4>
              </div>
            </li>
            <hr className="divider" />
            <li className="forum">
                <h3 className="topic"><i className='bx bxs-chat'></i> Upcoming Animes</h3>
              <div className='monitor'>
                <h4 className="discussion-count">Discussions: 200</h4>
                <h4 className='message-count'>Messages: 4013</h4>
              </div>
            </li>
          </div>
        </div>
        <div className="category-container">
          <div className="forum-container">
            <h2 className="category-name">Manga Discussions</h2>
          </div>
        </div>
        <div className="category-container">
          <div className="forum-container">
            <h2 className="category-name">Japanese Music Discussions</h2>
          </div>
        </div>
        <div className="category-container">
          <div className="forum-container">
            <h2 className="category-name">Other Discussions</h2>
          </div>
        </div>
    </section>
  )
}

"use client"
import { useEffect ,useState} from 'react';


export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };


  const [graceTime, setGraceTime] = useState<number | null>(null);
  const [searchLimit, setSearchLimit] = useState<number | null>(null);
  const [isEditingGraceTime, setIsEditingGraceTime] = useState(false);
  const [isEditingSearchLimit, setIsEditingSearchLimit] = useState(false);

  useEffect(() => {
    // Fetch current grace time settings
    fetch('/api/grace-time')
      .then(response => response.json())
      .then(data => setGraceTime(data.grace_time));

    // Fetch current search limit settings
    fetch('/api/search-limit')
      .then(response => response.json())
      .then(data => setSearchLimit(data.search_limit));
  }, []);

  const handleSaveGraceTime = () => {
    fetch('/api/grace-time', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ grace_time: graceTime }),
    }).then(() => setIsEditingGraceTime(false));
  };

  const handleSaveSearchLimit = () => {
    fetch('/api/search-limit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ search_limit: searchLimit }),
    }).then(() => setIsEditingSearchLimit(false));
  };

  return (
    <div>
      <p>Grace Time</p>
      <button onClick={handleButtonClick}>Settings</button>
      {isPopupOpen && (
        <div className="popup border border-black w-fit p-5 m-auto top-10">
          <div className="popup-content">
            <span className="close cursor-pointer" onClick={handleClosePopup}>&times;</span>
            <div>
              <p>Grace Time Settings</p>
              {isEditingGraceTime ? (
                <div>
                  <input
                    type="number"
                    value={graceTime ?? ''}
                    onChange={(e) => setGraceTime(Number(e.target.value))}
                  />
                  <button onClick={handleSaveGraceTime}>Save Changes</button>
                </div>
              ) : (
                <div>
                  <p>{graceTime}</p>
                  <button onClick={() => setIsEditingGraceTime(true)}>Edit Grace Time</button>
                </div>
              )}
            </div>
            <div>
              <p>Search Limit Settings</p>
              {isEditingSearchLimit ? (
                <div>
                  <input
                    type="number"
                    value={searchLimit ?? ''}
                    onChange={(e) => setSearchLimit(Number(e.target.value))}
                  />
                  <button onClick={handleSaveSearchLimit}>Save Changes</button>
                </div>
              ) : (
                <div>
                  <p>{searchLimit}</p>
                  <button onClick={() => setIsEditingSearchLimit(true)}>Edit Search Limit</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  // State for input positions
  const [namePos, setNamePos] = useState({ top: 50, left: 50 });
  const [passwordPos, setPasswordPos] = useState({ top: 150, left: 50 });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && password) {
      setIsLoggedIn(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const moveAwayThreshold = 300; // Radius within which inputs move away
    const speedFactor = 50; // Factor to move the inputs when close to the mouse

    // Function to calculate the new position if the mouse is near an element
    const moveElementAway = (elementPos: { top: number, left: number }) => {
      const elementCenterX = elementPos.left + 100; // Adjust for input element width
      const elementCenterY = elementPos.top + 20;  // Adjust for input element height
      const distanceX = elementCenterX - mouseX;
      const distanceY = elementCenterY - mouseY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < moveAwayThreshold) {
        const angle = Math.atan2(distanceY, distanceX);
        const newLeft = elementPos.left + Math.cos(angle) * speedFactor;
        const newTop = elementPos.top + Math.sin(angle) * speedFactor;
        return { top: newTop, left: newLeft };
      }
      return elementPos;
    };

    // Update positions if necessary
    setNamePos(moveElementAway(namePos));
    setPasswordPos(moveElementAway(passwordPos));
  };

  return (
      <div className="App" onMouseMove={handleMouseMove}>
        {isLoggedIn ? (
            <h1>Welcome, {name}! You have successfully logged in.</h1>
        ) : (
            <form onSubmit={handleSubmit}>
              <h1>You Can try logging in 😅</h1>
              <div
                  style={{
                    position: 'absolute',
                    top: `${namePos.top}px`,
                    left: `${namePos.left}px`,
                    transition: 'top 0.1s, left 0.1s',
                  }}
              >
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
              </div>
              <div
                  style={{
                    position: 'absolute',
                    top: `${passwordPos.top}px`,
                    left: `${passwordPos.left}px`,
                    transition: 'top 0.1s, left 0.1s',
                  }}
              >
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
              </div>
              <button type="submit">Enter</button>
            </form>
        )}
      </div>
  );
};

export default App;

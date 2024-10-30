import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GradientBackground.css'; // Import the CSS file

import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { toggle } from './styles';
import { BackSquareO } from './icons';

const BackButton = styled(animated.button)`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1rem;
  fill: currentColor;
  color: #f0f0f0; /* Light text color for contrast */
  padding: 0.5rem;
  margin-right: 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1); /* Subtle light overlay */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2); /* Light shadow for focus */
  }
`;

const Gradient = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  background: linear-gradient(${(props) => props.angle}, #ff0066, #ff0066, #ffcc00, #00ffcc, #0066ff, #cc00ff, #cc00ff);
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const GradientBackground = () => {
  const [angle, setAngle] = useState(45);
  const [backButtonProps, setBackButtonProps] = useSpring(() => ({ x: 0 }));

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prevAngle) => (prevAngle + 1) % 360); // Increment angle
    }, 50);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleBackClick = () => {
    navigate('/'); // Add your navigation logic here
    console.log('Navigating back to main page');
  };

  return (
    <Gradient angle={`${angle}deg`}>
      <div className="content">
        <BackButton
          onClick={handleBackClick}
          onMouseEnter={() => setBackButtonProps({ x: 5 })}
          onMouseLeave={() => setBackButtonProps({ x: 0 })}
          style={backButtonProps}
          aria-label="Go back to main page"
        >
          <BackSquareO style={{ ...toggle, opacity: 1, width: `50px` }} />
          Back
        </BackButton>
        <p>Enjoy</p>
      </div>
    </Gradient>
  );
};

export default GradientBackground;

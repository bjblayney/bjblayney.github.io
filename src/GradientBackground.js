import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Gradient = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.$embedded ? '100%' : '100vh')};
  min-height: ${(props) => (props.$embedded ? '0' : 'auto')};
  background: linear-gradient(
    ${(props) => props.$angle},
    #ff0066,
    #ff0066,
    #ffcc00,
    #00ffcc,
    #0066ff,
    #cc00ff,
    #cc00ff
  );
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

const GradientBackground = ({ embedded = false }) => {
  const [angle, setAngle] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prevAngle) => (prevAngle + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (embedded) {
    return <Gradient $angle={`${angle}deg`} $embedded />;
  }

  return (
    <Gradient $angle={`${angle}deg`} $embedded={false}>
      <div style={{ color: 'white', textAlign: 'center', fontSize: '2em' }}>
        <p>Enjoy</p>
      </div>
    </Gradient>
  );
};

export default GradientBackground;

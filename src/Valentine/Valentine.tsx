import { useState } from 'react';
import Confetti from 'react-dom-confetti';
import heart from './assets/heart.svg';
import './Valentine.scss';
import img0 from './assets/IMG_0104.jpeg';
import img1 from './assets/IMG_1200.jpeg';
import img2 from './assets/IMG_3226.jpeg';
import img3 from './assets/IMG_3240.jpeg';
import img4 from './assets/IMG_3683.jpeg';
import img5 from './assets/IMG_6763.jpeg';
import img6 from './assets/IMG_9320.jpeg';
import img7 from './assets/IMG_9441.jpeg';
import img8 from './assets/IMG_9533.jpeg';
import img9 from './assets/IMG_9737.jpeg';

const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 15,
  elementCount: 200,
  dragFriction: 0.05,
  duration: 3000,
  stagger: 3,
  width: '10px',
  height: '10px',
  perspective: '500px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

function Valentine(): JSX.Element {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000); // Reset after 3 seconds
  };

  const button = (
    <button
      type="button"
      style={{
        width: '144px', height: '48px', margin: '0 24px', fontSize: '16px', zIndex: 100,
      }}
      onClick={handleClick}
    >
      Yes
    </button>
  );

  if (window.innerWidth < 768) {
    return (
      <div style={{
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        verticalAlign: 'middle',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'pink',
        overflow: 'hidden',
        position: 'relative',
        fontSize: '24px',
      }}
      >
        Come back on desktop!
      </div>
    );
  }

  return (
    <div style={{
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      verticalAlign: 'middle',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'pink',
      overflow: 'hidden',
      position: 'relative',
    }}
    >
      <img
        src={img0}
        alt="img0"
        style={{
          position: 'absolute',
          top: '70%',
          left: '37%',
          width: '400px',
        }}
      />

      <img
        src={img1}
        alt="img1"
        style={{
          position: 'absolute',
          top: '3%',
          left: '27%',
          transform: 'rotate(5deg)',
          height: '400px',
        }}
      />

      <img
        src={img2}
        alt="img2"
        style={{
          position: 'absolute',
          top: '10%',
          left: '80%',
          transform: 'rotate(5deg)',
          height: '400px',
        }}
      />

      <img
        src={img3}
        alt="img3"
        style={{
          position: 'absolute',
          top: '30%',
          left: '10%',
          transform: 'rotate(-5deg)',
          height: '400px',
        }}
      />

      <img
        src={img4}
        alt="img4"
        style={{
          position: 'absolute',
          top: '55%',
          left: '80%',
          transform: 'rotate(-5deg)',
          height: '400px',
        }}
      />

      <img
        src={img5}
        alt="img5"
        style={{
          position: 'absolute',
          top: '2%',
          left: '58%',
          height: '400px',
        }}
      />

      <img
        src={img6}
        alt="img6"
        style={{
          position: 'absolute',
          top: '0%',
          left: '0%',
          height: '400px',
        }}
      />

      <img
        src={img7}
        alt="img7"
        style={{
          position: 'absolute',
          top: '60%',
          left: '0%',
          transform: 'rotate(5deg)',
          height: '400px',
        }}
      />

      <img
        src={img8}
        alt="img8"
        style={{
          position: 'absolute',
          top: '65%',
          left: '62%',
          transform: 'rotate(-5deg)',
          height: '400px',
        }}
      />

      <img
        src={img9}
        alt="img9"
        style={{
          position: 'absolute',
          top: '60%',
          left: '20%',
          transform: 'rotate(5deg)',
          height: '400px',
        }}
      />

      <Confetti active={showConfetti} config={confettiConfig} />

      <img
        src={heart}
        alt="heart"
        style={{
          animation: 'spin 2s linear infinite',
          width: '144px',
          height: '144px',
          margin: '16px',
        }}
      />

      <div style={{
        fontSize: '24px', margin: '24px', fontWeight: 'bold', textShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)', zIndex: 100,
      }}
      >
        Emi, will you be my valentine?
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {button}
        {button}
      </div>
    </div>
  );
}

export default Valentine;

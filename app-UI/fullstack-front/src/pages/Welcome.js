import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Welcome = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const fullText1 = 'Welcome to our bank!';
  const fullText2 = 'Please login to use our services';
  const styles1 = {
    fontSize: '36px',
    marginBottom: '20px',
    fontWeight: 'bold', 
    color: '#0074d9', 
    fontFamily: 'Arial, sans-serif' 
  };
  const styles2 = {
    fontSize: '18px', 
    color: 'white', 
    fontFamily: 'Arial, sans-serif' 
  };

  useEffect(() => {
    let currentIndex1 = 0;

    const interval1 = setInterval(() => {
      if (currentIndex1 <= fullText1.length) {
        setText1(fullText1.slice(0, currentIndex1));
        currentIndex1 += 1;
      } else {
        clearInterval(interval1);

        let currentIndex2 = 0;
        const interval2 = setInterval(() => {
          if (currentIndex2 <= fullText2.length) {
            setText2(fullText2.slice(0, currentIndex2));
            currentIndex2 += 1;
          } else {
            clearInterval(interval2);
          }
        }, 50);
      }
    }, 100);

    return () => clearInterval(interval1);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <h1 style={styles1}>{text1}</h1>
      <p style={styles2}>{text2}</p>
      <Link to="http://localhost:9080/login" className="btn btn-primary" style={{ fontSize: '18px' }}>
        Login
      </Link>
    </div>
  );
};

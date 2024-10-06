// src/components/LoginComponent.jsx

import React, { useState } from 'react';
import './LoginComponent.css'; // Make sure to create this CSS file
import { Col, Row } from 'antd';

const LoginComponent = () => {
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);
  const [isSignInClicked, setIsSignInClicked] = useState(false);

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setIsRegisterClicked(true);
    setIsSignInClicked(false);
  };

  const handleSignInClick = (e) => {
    e.preventDefault();
    setIsSignInClicked(true);
    setIsRegisterClicked(false);
  };

  return (
    <>
    <div>
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="800px"
        height="600px"
        viewBox="0 0 800 600"
        enableBackground="new 0 0 800 600"
        xmlSpace="preserve"
      >
        <linearGradient
          id="SVGID_1_"
          gradientUnits="userSpaceOnUse"
          x1="174.7899"
          y1="186.34"
          x2="330.1259"
          y2="186.34"
          gradientTransform="matrix(0.8538 0.5206 -0.5206 0.8538 147.9521 -79.1468)"
        >
          <stop offset="0" style={{ stopColor: '#FFC035' }} />
          <stop offset="0.221" style={{ stopColor: '#F9A639' }} />
          <stop offset="1" style={{ stopColor: '#E64F48' }} />
        </linearGradient>
        <circle fill="url(#SVGID_1_)" cx="266.498" cy="211.378" r="77.668" />
        <linearGradient
          id="SVGID_2_"
          gradientUnits="userSpaceOnUse"
          x1="290.551"
          y1="282.9592"
          x2="485.449"
          y2="282.9592"
        >
          <stop offset="0" style={{ stopColor: '#FFA33A' }} />
          <stop offset="0.0992" style={{ stopColor: '#E4A544' }} />
          <stop offset="0.9624" style={{ stopColor: '#00B59C' }} />
        </linearGradient>
        <circle fill="url(#SVGID_2_)" cx="388" cy="282.959" r="97.449" />
        <linearGradient
          id="SVGID_3_"
          gradientUnits="userSpaceOnUse"
          x1="180.3469"
          y1="362.2723"
          x2="249.7487"
          y2="362.2723"
        >
          <stop offset="0" style={{ stopColor: '#12B3D6' }} />
          <stop offset="1" style={{ stopColor: '#7853A8' }} />
        </linearGradient>
        <circle fill="url(#SVGID_3_)" cx="215.048" cy="362.272" r="34.701" />
        <linearGradient
          id="SVGID_4_"
          gradientUnits="userSpaceOnUse"
          x1="367.3469"
          y1="375.3673"
          x2="596.9388"
          y2="375.3673"
        >
          <stop offset="0" style={{ stopColor: '#12B3D6' }} />
          <stop offset="1" style={{ stopColor: '#7853A8' }} />
        </linearGradient>
        <circle fill="url(#SVGID_4_)" cx="482.143" cy="375.367" r="114.796" />
        <linearGradient
          id="SVGID_5_"
          gradientUnits="userSpaceOnUse"
          x1="365.4405"
          y1="172.8044"
          x2="492.4478"
          y2="172.8044"
          gradientTransform="matrix(0.8954 0.4453 -0.4453 0.8954 127.9825 -160.7537)"
        >
          <stop offset="0" style={{ stopColor: '#FFA33A' }} />
          <stop offset="1" style={{ stopColor: '#DF3D8E' }} />
        </linearGradient>
        <circle fill="url(#SVGID_5_)" cx="435.095" cy="184.986" r="63.504" />
      </svg>

      <div className="container">
        <h2>Login</h2>
        <form>
          <input type="text" className="email my_input" placeholder="Email" />
          <br />
          <input type="password" className="pwd my_input" placeholder="Password" />
        </form>
        <a href="#" className="link">
          Forgot your password?
        </a>
        <br />
        <button className="register" onClick={handleRegisterClick}>
          <span>Register</span>
        </button>
        <button className="signin" onClick={handleSignInClick}>
          <span>Sign In</span>
        </button>
        <h3
          className={`message ${isRegisterClicked ? 'show' : ''}`}
        >
          Your registration is complete!
        </h3>
        <h3
          className={`message ${isSignInClicked ? 'show' : ''}`}
        >
          Your sign in is complete!
        </h3>
        <div
          className="reg"
          style={{
            transform: isRegisterClicked
              ? 'translateY(40%) scale(5)'
              : 'translateY(-100%) scale(1)',
            borderRadius: isRegisterClicked ? '0' : '50%',
            width: isRegisterClicked ? '100%' : '20px',
            height: isRegisterClicked ? '100%' : '20px',
          }}
        ></div>
        <div
          className="sig"
          style={{
            transform: isSignInClicked
              ? 'translateY(40%) scale(5)'
              : 'translateY(-100%) scale(1)',
            borderRadius: isSignInClicked ? '0' : '50%',
            width: isSignInClicked ? '100%' : '20px',
            height: isSignInClicked ? '100%' : '20px',
          }}
        ></div>
      </div>

    </div>
    </>
  );
};

export default LoginComponent;

import React from 'react';
import "./Footer.css"


export default function Footer() {
  return (
    <div>

      <footer id="footer">
        <div className="leftFooter">
          <h4>DOWNLOAD OUR APP</h4>
          <p>Download App for Android and IOS mobile phone</p>
          <img src="/playstore.png" alt="Play Store" style={{ width: '120px',height : '50px', marginRight: '5px' }} />
          <img src="/Appstore.png" alt="App Store" style={{ width: '120px', height: '50px', marginRight: '5px' }} />
        </div>

        <div className="midFooter">
          <h1>Swigoto</h1>
          <p>Your Satisfaction is our first priority</p>

        </div>

        <div className="rightFooter">
          <h4>Follow Us</h4>
          <div className="col-md-4 d-flex align-items-center">
            {/* Instagram */}
            <a href="https://www.instagram.com/sisodia1424/" target="_blank" rel="noopener noreferrer" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
              <img src="/instagram.png" alt="Instagram" style={{ width: '30px', marginRight: '5px' }} />
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/harsh-kumar-46480b152/" target="_blank" rel="noopener noreferrer" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
              <img src="/linkedin.png" alt="LinkedIn" style={{ width: '30px', marginRight: '5px' }} />
            </a>
            {/* GitHub */}
            <a href="https://github.com/Harsh-Sisodia857/Harsh-Sisodia857" target="_blank" rel="noopener noreferrer" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
              <img src="/github.png" alt="GitHub" style={{ width: '30px', marginRight: '5px' }} />
            </a>
          </div>
        </div>
      </footer>

     
    </div>
  );
}

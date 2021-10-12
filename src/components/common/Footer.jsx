import * as Route from 'constants/routes';
import logo from 'images/logo-full.png';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const { pathname } = useLocation();

  const visibleOnlyPath = [
    Route.HOME,
    Route.SHOP
  ];

  return !visibleOnlyPath.includes(pathname) ? null : (
    <footer className="footer">
      <div className="footer-col-1">
        <div className="footer-row-1">
          Name Group
          <div className="footer-col-1">
            <strong>
              <span>
                {' '}
                <a href="https://github.com/jgudo">About us</a>
              </span>
            </strong>
          </div>
          <div className="footer-row-2">
            <strong>
              <span>
                <a href="https://github.com/jgudo">How it works</a>
              </span>
            </strong>
          </div>

          <div className="footer-row-3">
            <strong>
              <span>
                <a href="https://github.com/jgudo">Contact Us</a>
              </span>
            </strong>
          </div>
        </div>
      </div>
      <div className="footer-col-2">
        <img alt="Footer logo" className="footer-logo" src={logo} />
        <h5>
          &copy;&nbsp;
          {new Date().getFullYear()}
        </h5>
      </div>
      <div className="footer-col-3">
        <div className="footer-row-1">
          Legal & Support
          <div className="footer-col-1">
            <strong>
              <span>
                {' '}
                <a href="https://github.com/jgudo">Terms & Privacy</a>
              </span>
            </strong>
          </div>
          <div className="footer-row-2">
            <strong>
              <span>
                <a href="https://github.com/jgudo">Careers</a>
              </span>
            </strong>
          </div>

          <div className="footer-row-3">
            <strong>
              <span>
                <a href="https://github.com/jgudo">Contact Us</a>
              </span>
            </strong>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

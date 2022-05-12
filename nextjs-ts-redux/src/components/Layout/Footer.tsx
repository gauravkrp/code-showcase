
const Footer = () =>  {
  const myApp_website = process.env.NEXT_PUBLIC_WEBSITE;
  return (
    <div className="app-footer-container">
      <div className="app-footer-wrapper">
        <p className="system-status">
          <span>System Status:</span> <span>All Good</span>
        </p>
        <div className="go2Website">
          <a href={myApp_website} target="_blank" rel="noopener noreferrer">
            Go to myApp website
            {/* <Image src="/assets/svg/externalLink.svg" /> */}
          </a>
        </div>
        <div>
          <p className="copyright-text">©2022 myApp fitness</p>
          <ul className="footer-links">
            <li>
              <a href="">Terms</a>
            </li>
            <li>
              <a href="">Privacy</a>
            </li>
            <li>
              <a href="">Docs</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;

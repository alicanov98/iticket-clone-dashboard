const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <p className="copyright">
            i-ticket Dashboard Made by <span>Malik Alijanov</span> ©{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

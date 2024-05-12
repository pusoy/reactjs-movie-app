import "./404.css";

const Error404 = () => {
  return (
    <div id="not-found-page" className="container">
      <h1>404</h1>
      <p>The page you were looking for does not exist</p>
      <button className="primary-btn">Go back</button>
    </div>
  );
};

export default Error404;

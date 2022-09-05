import React from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

function Navigation(props) {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Shihelper
          </Link>

          <div>
            <ul className="navbar-nav ml-auto">
              <li
                className={`nav-item  ${
                  props.router.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.router.location.pathname === "/about/" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/about/">
                  Help
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.router.location.pathname === "/sources/" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/sources/">
                  Sources
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.router.location.pathname === "/helper/" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/helper/">
                  Helper
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
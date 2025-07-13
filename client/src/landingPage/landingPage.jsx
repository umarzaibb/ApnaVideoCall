import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  function onClickLoginBtn() {
    navigate("/login");
  }

  return (
    <>
      <div className="LandingPageDiv">
        <nav
          class="navbar navbar-expand-lg bg-body-primary "
          data-bs-theme="dark"
        >
          <div class="container-fluid">
            <a class="navbar-brand fs-2 ms-3" href="#">
              APNA VIDEO CALL
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div
              class="collapse navbar-collapse position-absolute end-0"
              id="navbarNav"
            >
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link active me-3" aria-current="page" href="#">
                    Join as Guest
                  </a>
                </li>
                <button
                  class="btn btn-outline-primary me-3"
                  onClick={onClickLoginBtn}
                  type="submit"
                >
                  Login
                </button>
                <li class="nav-item">
                  <a class="nav-link me-4" href="/signup">
                    Signup
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="LandingPageText">
          <h1>
            <span style={{ color: "rgb(255, 119, 0)" }}>Connect</span> with your
            Loved Ones
          </h1>
          <p>Cover a distance by apna video call</p>
          <button>Get Started </button>
        </div>

        <div className="imageVideoCall">
          <img src="/Adobe_Express_file.png" />
        </div>
      </div>
    </>
  );
}

export default LandingPage;

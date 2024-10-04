import Header from "./components/1Header";
import Main from "./components/2Main";
import Footer from "./components/3Footer";
import { useState, createContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faEye,
  faEyeSlash,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react-refresh/only-export-components
export const modeContext = createContext();

function App() {
  const [mode, setMode] = useState(
    localStorage.getItem("taskMode") ? localStorage.getItem("taskMode") : ""
  );

  useEffect(() => {
    localStorage.setItem("taskMode", mode);
  }, [mode]);

  const [up, setUp] = useState({ opa: 0, showHide: "hide" });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        setUp({ opacity: 1, showHide: "show" });
      } else {
        setUp({ opacity: 0, showHide: "hide" });
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // State for the username and the key
  const [keyInfo, setKeyInfo] = useState(
    localStorage.getItem("keyInfo")
      ? JSON.parse(localStorage.getItem("keyInfo"))
      : { username: "", key: "" }
  );

  // useEffect to control wrong-true display
  useEffect(() => {
    if (keyInfo.key !== "") {
      setDisplayWrongTrue(false);
    }
  }, [keyInfo]);

  // State for link UI and localStorage
  const [displayKeyOrNot, setDisplayKeyOrNot] = useState(
    localStorage.getItem("keyInfo") ? false : true
  );

  // The licenseKey
  const licenseKey = "G7h8I9j0K!@#A1b2C3d4E5f6";

  // Function submit
  function submit() {
    // If the key matches
    if (licenseKey === keyInfo.key.trim()) {
      setTimeout(() => {
        localStorage.setItem("keyInfo", JSON.stringify(keyInfo));
        setDisplayKeyOrNot(false);
      }, 1000);
    } else {
      setDisplayWrongTrue(true);
    }
  }

  // State for displayWrongTrue
  const [displayWrongTrue, setDisplayWrongTrue] = useState(false);

  // State for controlling the visibility of the password
  const [passwordVisible, setPasswordVisible] = useState(false);

  // State for handling copy effect
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(licenseKey);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000); // Reset after 2 seconds
  };

  return (
    <modeContext.Provider value={[mode, setMode]}>
      <div className={`content ${mode}`}>
        <div className={`container-all`}>
          <Header />
          <Main />
          <Footer />

          <button
            onClick={() => window.scrollTo(0, 0)}
            style={{ opacity: up.opa }}
            className={`scrool-up ${up.showHide}`}
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
        </div>

        {displayKeyOrNot && (
          <div className="key-container">
            <div className="key-box">
              <p>
                This application requires a valid license. <br />
                Please enter your username and the key provided by the owner.
              </p>
              <input
                value={keyInfo.username}
                onChange={(e) => {
                  setKeyInfo({ ...keyInfo, username: e.target.value });
                }}
                type="text"
                placeholder="Enter your username"
                name="username"
                required
                autoComplete="off"
              />

              <div className="input-wrapper">
                <input
                  value={keyInfo.key}
                  onChange={(e) => {
                    setKeyInfo({ ...keyInfo, key: e.target.value });
                  }}
                  type={passwordVisible ? "text" : "password"}
                  name="key"
                  placeholder="Enter your license key"
                  required
                />

                {keyInfo.key !== "" && (
                  <span onClick={() => setPasswordVisible(!passwordVisible)}>
                    <FontAwesomeIcon
                      icon={passwordVisible ? faEyeSlash : faEye}
                    />
                  </span>
                )}
              </div>

              <div>
                key ={" "}
                <span style={{ marginRight: "10px" }}>
                  G7h8I9j0K!@#A1b2C3d4E5f6
                </span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={handleCopy}
                >
                  <FontAwesomeIcon icon={faCopy} />
                </span>
                {copySuccess && <span style={{ marginLeft: "10px" }}>Copied!</span>}
              </div>

              <button
                disabled={keyInfo.username === "" || keyInfo.key === ""}
                type="submit"
                onClick={() => submit()}
              >
                Submit
              </button>

              {displayWrongTrue && (
                <span className="wrong-true">your license key is wrong !</span>
              )}
            </div>
          </div>
        )}
      </div>
    </modeContext.Provider>
  );
}

export default App;

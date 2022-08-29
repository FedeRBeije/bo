import { useNavigate, NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import logoWhite from "../../assets/images/logo-white.svg";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className={styles["nav"]}>
      <NavLink className={styles["logo"]} to="/">
        <img src={logoWhite} alt="logo white" />
      </NavLink>
      <ul role="list" className={styles["menu"]}>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles["active"] : "")}
            to="/teaching-materials"
          >
            Materiale Didattico
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles["active"] : "")}
            to="/jobs"
          >
            Offerte di lavoro
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles["active"] : "")}
            to="/blogs"
          >
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles["active"] : "")}
            to="/case-studies"
          >
            Case study
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles["active"] : "")}
            to="/events"
          >
            Eventi
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles["active"] : "")}
            to="/community"
          >
            Community
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles["active"] : "")}
            to="/academy"
          >
            Academy
          </NavLink>
        </li>
        <li>
          <div style={{ marginLeft: 30 }}>
            <button onClick={(e) => {
              e.preventDefault();
              window.localStorage.clear();
              navigate("/login")
            }} className="primary-button">LogOut</button></div></li>
      </ul>

    </nav>
  );
};

export default Navbar;

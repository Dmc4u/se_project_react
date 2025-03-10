import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
    return (
        <div className="sidebar">
          <img src={avatar} alt="Username" className="sidebar__avatar" />
          <p className="sidebar__username">User Name</p>
        </div>
    )
}

export default SideBar;
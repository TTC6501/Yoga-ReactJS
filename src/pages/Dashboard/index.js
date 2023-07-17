import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login')
    }

    return (
        <div>
            <h2>Dashboard page</h2>
            <div>
                <Link to="/user">User</Link>
            </div>
            <div>
                <Link to="/staff">Staff</Link>
            </div>
            <div>
                <Link to="/classList">Class</Link>
            </div>
            <div>
                <Link to="/courseList">Course</Link>
            </div>
            <div>
                <Link to="/room">Room</Link>
            </div>
            <div>
                <Link to="/bookingManagement">Booking</Link>
            </div>
            <div>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;

import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

function Dashboard() {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div>
            <h2>Dashboard page</h2>
            <div>
                <a href="/user">User</a>
            </div>
            <div>
                <a href="/staff">Staff</a>
            </div>
            <div>
                <a href="/classList">Class</a>
            </div>
            <div>
                <a href="/courseList">Course</a>
            </div>
            <div>
                <a href="/room">Room</a>
            </div>
            <div>
                <a href="/bookingManagement">Booking</a>
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

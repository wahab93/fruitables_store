import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '../admin/sidebar';
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useLogout } from '../../hooks/useLogout';


const socket = io('http://localhost:5000');

export const AdminLayout = () => {
    const stateUser = useSelector((state) => state.userHandler.user.name);
    console.log('stateUser in admin layout:', stateUser);

    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);

    const navigate = useNavigate();
    const logOut = useLogout();

    useEffect(() => {
        // Use an online sound file URL
        const audio = new Audio('https://www.myinstants.com/media/sounds/bell.mp3');
        // Listen for new orders
        socket.on('newOrder', (order) => {
            // Play the sound when a new order is received
            audio.play();
            console.log('order from socket', order)
            toast.info(`New order placed! Order Code: ${order.orderCode}, Total: ${order.totalAmount}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // Update notifications state
            setNotifications(prevNotifications => [
                ...prevNotifications,
                { id: order.orderCode, message: `Order Code: ${order.orderCode}, Total: ${order.totalAmount}` }
            ]);
            setNotificationCount(prevCount => prevCount + 1)
        });
        // Handle successful connection
        socket.on('connect', () => {
            // alert('Connected to the Socket.IO server');
            console.log('Connected to the Socket.IO server');
        });

        // Handle disconnection
        socket.on('disconnect', (reason) => {
            alert('Disconnected from the Socket.IO server:', reason);
        });

        // Clean up the event listeners on component unmount
        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    const handleNotificationClick = (id) => {
        // Navigate to the order listing page
        navigate(`/admin/orderlisting?orderId=${id}`);

        // Remove the notification
        setNotifications(prevNotifications =>
            prevNotifications.filter(notification => notification.id !== id)
        );

        // Decrease the counter
        setNotificationCount(prevCount => prevCount - 1);
    };


    return (
        <>
            <ToastContainer />
            <div className="container-fluid" id='admin'>
                <div className='row'>
                    <div className='col-3 ps-0'>
                        <Sidebar />
                    </div>
                    <div className='col'>
                        <main className="content" id='admin'>
                            <div className="container-fluid p-0">
                                <div className='row'>
                                    <div className='col-12 px-md-0'>
                                        <div className='bg-light p-3 d-flex align-items-center justify-content-between'>
                                            <p>Welcome : <strong className='text-capitalize'>{stateUser}</strong></p>
                                            <div className='d-flex align-items-center'>
                                                {/* Notification Dropdown */}
                                                <div className="dropdown">
                                                    <a
                                                        href="#"
                                                        className="text-dark position-relative me-3"
                                                        id="notificationDropdown"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        <i className="fs-4 fa fa-bell"></i>
                                                        {notificationCount > 0 && (
                                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary blink">
                                                                {notificationCount}
                                                            </span>
                                                        )}
                                                    </a>
                                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="notificationDropdown">
                                                        {notifications.length > 0 ? (
                                                            notifications.slice(0, 3).map((notif, index) => (
                                                                <li key={notif.id}>
                                                                    <a
                                                                        className="dropdown-item py-2"
                                                                        href="#"
                                                                        onClick={() => handleNotificationClick(notif.id)}
                                                                    >
                                                                        {notif.message}
                                                                    </a>
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <li><a className="dropdown-item py-2" href="#">No new notifications</a></li>
                                                        )}
                                                        <li><a className="dropdown-item text-center border-top" href="#">View all</a></li>
                                                    </ul>
                                                </div>

                                                {/* Logout */}
                                                <div className='fw-bold border p-2 cursor-pointer' onClick={logOut}>
                                                    <i className='fa fa-sign-out text-primary'></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Outlet />
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}
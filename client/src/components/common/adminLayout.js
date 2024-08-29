import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../admin/sidebar';
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io('http://localhost:5000');

export const AdminLayout = () => {
    useEffect(() => {
        // Use an online sound file URL
        const audio = new Audio('https://www.myinstants.com/media/sounds/bell.mp3');
        // Listen for new orders
        socket.on('newOrder', (order) => {
            console.log('order from socket', order)
            toast.info(`New order placed! Order Code: ${order.orderCode}, Total: ${order.totalAmount}`, {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // Play the sound when a new order is received
            audio.play();

            // alert(`New order placed!\nOrder Code: ${order.orderCode}\nTotal Amount: ${order.totalAmount}`);
            // // Alternatively, you could update the UI with the new order
        });
        // Handle successful connection
        socket.on('connect', () => {
            alert('Connected to the Socket.IO server');
            console.log('Connected to the Socket.IO server');
        });

        // Handle disconnection
        socket.on('disconnect', (reason) => {
            alert('Disconnected from the Socket.IO server:', reason);
        });

        // Handle connection errors
        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        // Handle reconnection attempts
        socket.on('reconnect_attempt', () => {
            alert('Attempting to reconnect to the server...');
        });

        // Clean up the event listeners on component unmount
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
            socket.off('reconnect_attempt');
        };
    }, []);


    return (
        <>
            <ToastContainer />
            <div className="container-fluid" id='admin'>
                <div className='row'>
                    <div className='col-3 ps-0'>
                        <Sidebar />
                    </div>
                    <div className='col'>
                        <div className="main">
                            <main className="content">
                                <div className="container-fluid p-0">
                                    <Outlet />
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
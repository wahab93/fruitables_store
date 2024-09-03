import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        const audio = new Audio('https://www.myinstants.com/media/sounds/bell.mp3');

        const handleNewOrder = (order) => {
            audio.play();
            toast.info(`New order placed! Order Code: ${order.orderCode}, Total: ${order.totalAmount}`, {
                position: "top-right",
                autoClose: 5000,
            });
            addNotification(`Order Code: ${order.orderCode}, Total: ${order.totalAmount}`);
        };

        const handleLowStock = (product) => {
            toast.warn(`Stock alert! ${product.name} is out of stock.`, {
                position: "top-right",
                autoClose: 5000,
            });
            addNotification(`Stock alert! ${product.name} is out of stock.`);
        };

        const addNotification = (message) => {
            setNotifications(prev => [...prev, { id: Date.now(), message }]);
            setNotificationCount(prevCount => prevCount + 1);
        };

        socket.on('newOrder', handleNewOrder);
        socket.on('lowStock', handleLowStock);

        return () => {
            socket.off('newOrder', handleNewOrder);
            socket.off('lowStock', handleLowStock);
        };
    }, []);

    const clearNotification = (id) => {
        setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id));
        setNotificationCount(prevCount => prevCount - 1);
    };

    return {
        notifications,
        notificationCount,
        clearNotification,
    };
};
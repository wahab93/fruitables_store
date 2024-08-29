import React, { useEffect, useMemo, useState } from 'react';
import './admin.css';
import { StatisticsCard } from './statisticsCard';
import { orderServices } from '../../services/orderServices';

export const Dashboard = () => {
  const [orders, setOrders] = useState([])
  console.log('orders', orders)
  useEffect(() => {
    const getAllOrders = async () => {
      let getOrdersURL = '/getOrders'
      try {
        const res = await orderServices.getAllOrder(getOrdersURL);
        setOrders(res.reverse());
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    getAllOrders();
  }, [])

  const totalAmount = orders.reduce((acc, product) => acc + product.totalAmount, 0);
  console.log('totalAmount', totalAmount)


  // Compute pending orders from the orders state
  const pendingOrders = useMemo(() => {
    return orders.filter(order => order.orderStatus === 'pending');
  }, [orders]);

  return (
    <div className="container-fluid" id='admin'>
      <div className='row'>
        <div className='col my-4'>
          <h2>Analytics Dashboard</h2>
          <div className="row">
            <StatisticsCard title="Income" value={totalAmount} percentage="-3.65" iconClass="fa-truck" isIncrease={false} />
            <StatisticsCard title="Pending Orders" value={pendingOrders.length} percentage="6.65" iconClass="fa-money-bill" isIncrease={true} />
            <StatisticsCard title="Total Orders" value={orders.length} percentage="-2.25" iconClass="fa-shopping-cart" isIncrease={false} />
          </div>
        </div>
      </div>
    </div>
  );
};
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
        setOrders(res);
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
  // Compute completed orders from the orders state
  const completedOrders = useMemo(() => {
    return orders.filter(order => order.orderStatus === 'completed');
  }, [orders]);
  // Compute dispatching orders from the orders state
  const dispatchingOrders = useMemo(() => {
    return orders.filter(order => order.orderStatus === 'dispatching');
  }, [orders]);

  return (
    <div className='row'>
      <div className='col my-4'>
        <div className='d-flex justify-content-between'>
          <h3>Orders</h3>
          <h4>Income: <strong>{totalAmount}</strong>/-</h4>
        </div>
        <div className="row">
          {/* <StatisticsCard title="Income" value={totalAmount} percentage="-3.65" iconClass="fa-money-bill" isIncrease={false} /> */}
          <StatisticsCard title="Completed" value={completedOrders.length} percentage="-2.25" iconClass="fa-shopping-cart" isIncrease={false} />
          <StatisticsCard title="Dispatching" value={dispatchingOrders.length} percentage="6.65" iconClass="fa-truck" isIncrease={true} />
          <StatisticsCard title="Pending" value={pendingOrders.length} percentage="6.65" iconClass="fa-truck" isIncrease={true} />
          <StatisticsCard title="Total" value={orders.length} percentage="-2.25" iconClass="fa-shopping-cart" isIncrease={false} />
        </div>
      </div>
    </div>
  );
};
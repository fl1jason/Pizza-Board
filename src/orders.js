import React, { useEffect, useState } from 'react';
import {db} from "./firestore";
import ReactTextTransition, { presets } from "react-text-transition";

import banner from './assets/SaltAndPepperBanner.jpg';
import logo from './assets/pizza.png';

export const Orders = () => {

    const [pizzaOrders, setPizzaOrders] = useState(null);
    const [status, setStatus] = useState("");
    const [display, setDisplay] = useState(true);

    useEffect(() => {
        listenForOrders();
    },[])

    const listenForOrders = () => {
        
        const ref = db.collection('orders');
        let observer = ref.onSnapshot(docSnapshot => {

            console.log("Received a New Order");
            const allOrders = [];
            docSnapshot.docs.forEach(doc => {    
                    allOrders.push(doc.data());
            });

            setPizzaOrders(allOrders);

            const now = new Date();
            setStatus(`Updated ${now.toLocaleTimeString()}`);
      
          }, err => {
            console.log(`Encountered an error: ${err}`);
          });
    }

    const displayValue = (order) => {
        return (display == true? order.id : order.customer);
    }

    const getOrders = (status) => {
        return (pizzaOrders.filter(order => order.status === status));
    }

    if (pizzaOrders)
    {
        return (
        <div className="">
            <img src={banner} className="banner" />
            <div className="flex-container">
                <div className="status_column">
                <p className="status_column_heading">Preparing ...</p>
                    {getOrders('confirmed').map(order => (
                        <div key={order.id}>{displayValue(order)}</div>
                    ))}
                </div>
                <div className="status_column">
                <p className="status_column_heading">Please Collect</p>
                    {getOrders('ready').map(order => (
                        <div key={order.id}>{displayValue(order)}</div>
                    ))}
                </div>
                <div className="status_column">
                <p className="status_column_heading">On Route</p>
                    {getOrders('on_route').map(order => (
                        <div key={order.id}>    
                            {displayValue(order)}
                        </div>
                    ))}
                </div>
                <div className="status_column status">
                    <img src={logo} className="App-logo" />
                    <ReactTextTransition
                        className="status-text" 
                        text={status}
                        overflow
                    />
                </div>
            </div>
        </div>
        );
    }
    else
    {
        return (
        <div>
            <p>Loading Orders, please wait ...</p>
        </div>
        )
    }
}
export default Orders;
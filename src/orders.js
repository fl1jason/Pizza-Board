import React, { useEffect, useState } from 'react';
import {db} from "./firestore";

export const Orders = () => {

    const [pizzaOrders, setPizzaOrders] = useState(null);
    const [status, setStatus] = useState("");

    useEffect(() => {
        listenForOrders();
    },[])

    const listenForOrders = () => {
        
        const ref = db.collection('orders');
        let observer = ref.onSnapshot(docSnapshot => {

            console.log("Received a New Order");
            const allOrders = [];
            docSnapshot.docs.forEach(doc => {    
                const {id, Customer, Status} = doc.data();
                    allOrders.push(doc.data());
                
                console.log(`Added Customer ${Customer} with Status ${Status}`);
            });

            setPizzaOrders(allOrders);

            const now = new Date();
            setStatus(`Updated ${now.toLocaleTimeString()}`);
      
          }, err => {
            console.log(`Encountered error: ${err}`);
          });
    }

    const getOrders = (status) => {
        return (pizzaOrders.filter(order => order.status === status));
    }

    if (pizzaOrders)
    {
        return (
        <div className="wrapper">
            <div className="flex-container">
                <div className="status_column">
                <p className="status_column_heading">Preparing ...</p>
                    {getOrders('confirmed').map(order => (
                        <div key={order.id}>{order.customer}</div>
                    ))}
                </div>
                <div className="status_column">
                <p className="status_column_heading">Please Collect</p>
                    {getOrders('ready').map(order => (
                        <div key={order.id}>{order.customer}</div>
                    ))}
                </div>
                <div className="status_column">
                <p className="status_column_heading">On Route</p>
                    {getOrders('on_route').map(order => (
                        <div key={order.id}>{order.customer}</div>
                    ))}
                </div>
                <div className="status_column status">
                    <p>{status}</p>
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
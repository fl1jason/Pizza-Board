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
        return (pizzaOrders.filter(order => order.Status === status));
    }

    if (pizzaOrders)
    {
        return (
        <div className="wrapper">
            <div className="flex-container">
                <div className="status_column">
                <p className="status_column_heading">Preparing ...</p>
                    {getOrders('Pending').map(order => (
                        <div key={order.id}>{order.Customer}</div>
                    ))}
                </div>
                <div className="status_column">
                <p className="status_column_heading">Please Collect</p>
                    {getOrders('Complete').map(order => (
                        <div key={order.id}>{order.Customer}</div>
                    ))}
                </div>
                <div className="status_column">
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
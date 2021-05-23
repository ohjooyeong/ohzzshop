import React from "react";

const HistoryPage = (props) => {
    return (
        <div style={{ width: "80%", margin: "3rem auto" }}>
            <div style={{ textAlign: "center" }}>
                <h1>History</h1>
            </div>
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date of Purchase</th>
                    </tr>
                </thead>
                <tbody>
                    {props.user.userData &&
                        props.user.userData.history.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.dataOfPurchase}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryPage;

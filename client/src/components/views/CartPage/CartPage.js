import { Empty } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItems, removeCartItem } from "../../../_actions/user_actions";
import UserCardBlock from "./Section/UserCardBlock";
import Paypal from "../../utils/Paypal";

const CartPage = (props) => {
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0);
    const [ShowTotal, setShowTotal] = useState(false);

    useEffect(() => {
        // 리덕스 User state안에 cart안에 상품이 들어있는지 확인
        let cartItems = [];
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach((item) => {
                    cartItems.push(item.id);
                });
                dispatch(getCartItems(cartItems, props.user.userData.cart)).then((response) => {
                    calculateTotal(response.payload);
                });
            }
        }
    }, [props.user.userData]);
    let calculateTotal = (cartDetail) => {
        let total = 0;
        cartDetail.map((item) => {
            total += parseInt(item.price, 10) * item.quantity;
        });
        setTotal(total);
        setShowTotal(true);
    };

    let removeFromCart = (productId) => {
        dispatch(removeCartItem(productId)).then((response) => {
            console.log(response.payload);
            if (response.payload.productInfo.length <= 0) {
                setShowTotal(false);
            } else {
                calculateTotal(response.payload.productInfo);
            }
        });
    };

    return (
        <div style={{ width: "85%", margin: "3rem auto" }}>
            <h1>내 장바구니</h1>
            <UserCardBlock products={props.user.cartDetail} removeItem={removeFromCart} />
            {ShowTotal ? (
                <div style={{ marginTop: "3rem" }}>
                    <h2>총 가격: ${Total}</h2>
                </div>
            ) : (
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <br />
                    <Empty description={false} />
                    <p>No Items In the Cart</p>
                </div>
            )}
            <Paypal />
        </div>
    );
};

export default CartPage;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_actions";
import UserCardBlock from "./Section/UserCardBlock";

const CartPage = (props) => {
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0);

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
    };
    return (
        <div style={{ width: "85%", margin: "3rem auto" }}>
            <h1>내 장바구니</h1>
            <UserCardBlock products={props.user.cartDetail} />
            <div style={{ marginTop: "3rem" }}>
                <h2>총 가격: ${Total}</h2>
            </div>
        </div>
    );
};

export default CartPage;

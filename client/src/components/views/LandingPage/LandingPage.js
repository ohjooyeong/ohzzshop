import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import ImageSilder from "../../utils/ImageSilder";

function LandingPage() {
    const [Products, setProducts] = useState([]);

    useEffect(() => {
        let body = {};
        axios.post("/api/product/products").then((response) => {
            if (response.data.success) {
                setProducts(response.data.productInfo);
            } else {
                alert("상품들을 가져오는 데 실패했습니다");
            }
        });
    }, []);

    const renderCards = Products.map((product, index) => {
        return (
            <Col lg={6} md={8} xs={24} key={`${product.title}${index}`}>
                <Card cover={<ImageSilder images={product.images} />}>
                    <Card.Meta title={product.title} description={`$${product.price}`} />
                </Card>
            </Col>
        );
    });

    return (
        <div style={{ width: "75%", margin: "3rem auto" }}>
            <div style={{ textAlign: "center" }}>
                <h2>
                    Let's Travel Anywhere <Icon type="rocket"></Icon>
                </h2>
            </div>
            <Row gutter={[16, 16]}>{renderCards}</Row>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <button>더보기</button>
            </div>
        </div>
    );
}

export default LandingPage;

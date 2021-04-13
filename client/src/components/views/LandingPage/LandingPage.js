import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import ImageSilder from "../../utils/ImageSilder";

function LandingPage() {
    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState(0);
    const [NextProduct, setNextProduct] = useState(true);

    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit,
        };

        getProducts(body);
    }, []);

    const getProducts = (body) => {
        axios.post("/api/product/products", body).then((response) => {
            if (response.data.success) {
                if (body.loadMore) {
                    setProducts([...Products, ...response.data.productInfo]);
                } else {
                    setProducts(response.data.productInfo);
                }
                setPostSize(response.data.postSize);
                setNextProduct(response.data.next);
            } else {
                alert("상품들을 가져오는 데 실패했습니다");
            }
        });
    };

    const loadMoreHandler = () => {
        let skip = Skip + Limit;
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
        };
        getProducts(body);
        setSkip(skip);
    };

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

            <br />
            {PostSize >= Limit && !NextProduct && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>
            )}
        </div>
    );
}

export default LandingPage;

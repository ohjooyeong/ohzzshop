import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import ImageSilder from "../../utils/ImageSilder";
import CheckBox from "./Section/CheckBox";
import RadioBox from "./Section/RadioBox";
import { continents, price } from "./Section/Datas";
import SearchFeature from "./Section/SearchFeature";

function LandingPage() {
    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState(0);
    const [NextProduct, setNextProduct] = useState(true);
    const [Filters, setFilters] = useState({
        continents: [],
        price: [],
    });
    const [SearchTerm, setSearchTerm] = useState("");

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
            filters: Filters,
            searchTerm: SearchTerm,
        };
        getProducts(body);
        setSkip(skip);
    };

    const showFilteredResults = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters,
            searchTerm: SearchTerm,
        };

        getProducts(body);
        setSkip(0);
    };

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }

        return array;
    };

    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters };
        newFilters[category] = filters;

        if (category === "price") {
            let priceValues = handlePrice(filters);
            newFilters[category] = priceValues;
        }

        showFilteredResults(newFilters);
        setFilters(newFilters);
    };

    const renderCards = Products.map((product, index) => {
        return (
            <Col lg={6} md={8} xs={24} key={`${product.title}${index}`}>
                <Card
                    cover={
                        <a href={`/product/${product._id}`}>
                            <ImageSilder images={product.images} />
                        </a>
                    }
                >
                    <Card.Meta title={product.title} description={`$${product.price}`} />
                </Card>
            </Col>
        );
    });

    const updateSearchTerm = (newSearchTerm) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm,
        };
        setSkip(0);
        setSearchTerm(newSearchTerm);
        getProducts(body);
    };

    return (
        <div style={{ width: "75%", margin: "3rem auto" }}>
            <div style={{ textAlign: "center" }}>
                <h2>
                    Let's Travel Anywhere <Icon type="rocket"></Icon>
                </h2>
            </div>
            {/* Filter */}
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                    <CheckBox
                        list={continents}
                        handleFilters={(filters) => handleFilters(filters, "continents")}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox
                        list={price}
                        handleFilters={(filters) => handleFilters(filters, "price")}
                    />
                </Col>
            </Row>
            <div style={{ display: "flex", justifyContent: "flex-end", margin: "1rem auto" }}>
                <SearchFeature refreshFunction={updateSearchTerm} />
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

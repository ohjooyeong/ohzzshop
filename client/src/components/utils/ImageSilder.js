import { Carousel } from "antd";
import React from "react";

const ImageSilder = (props) => {
    return (
        <Carousel autoplay>
            {props.images.map((image, index) => (
                <div key={index}>
                    <img
                        style={{ width: "100%", maxHeight: "150px", height: "150px" }}
                        src={`http://localhost:5000/${image}`}
                    />
                </div>
            ))}
        </Carousel>
    );
};

export default ImageSilder;

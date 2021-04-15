import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

const SearchFeature = (props) => {
    const [SearchTerm, setSearchTerm] = useState("");

    const searchHandler = (e) => {
        setSearchTerm(e.currentTarget.value);
        props.refreshFunction(e.currentTarget.value);
    };

    return (
        <div>
            <Search style={{ width: 200 }} onChange={searchHandler} value={SearchTerm} />
        </div>
    );
};

export default SearchFeature;

import React, { useState } from "react";
import { Collapse, Checkbox, Radio } from "antd";

const { Panel } = Collapse;

const RadioBox = (props) => {
    const [Value, setValue] = useState(0);

    const renderRadioboxLists = () =>
        props.list &&
        props.list.map((value) => (
            <Radio key={value._id} value={value._id}>
                {value.name}
            </Radio>
        ));

    const handleChange = (e) => {
        setValue(e.target.value);
        props.handleFilters(e.target.value);
    };

    return (
        <Collapse defaultActiveKey={["1"]}>
            <Panel header="This is panel header 1" key="1">
                <Radio.Group value={Value} onChange={handleChange}>
                    {renderRadioboxLists()}
                </Radio.Group>
            </Panel>
        </Collapse>
    );
};

export default RadioBox;

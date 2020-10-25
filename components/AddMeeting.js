import { useState } from "react";
import { Button, Modal, Form, Input, DatePicker } from "antd";

import fetcher from "../utils/fetcher";

import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { createMeeting } from "../lib/db";

const ResultDisplayer = ({ results, handleOnClick, visible }) => {
    return (
        visible &&
        results.map((result, index) => {
            return (
                <div onClick={() => handleOnClick(result)} key={index}>
                    {result.display_name}
                </div>
            );
        })
    );
};

const AddMeeting = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState([]);
    const [locationToSearch, setLocationToSearch] = useState("");
    const [locationSelected, setLocationSelected] = useState(null);
    const [form] = Form.useForm();

    const onOpen = () => {
        setIsOpen(true);
    };

    const onClose = () => {
        setLocationSelected(null);
        setLocationToSearch("");
        setResults([]);
        form.resetFields();
        setIsOpen(false);
    };

    const onCreateMeeting = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            location_lat: locationSelected.lat,
            location_lon: locationSelected.lon,
            location_name: locationSelected.display_name,
            date: fieldsValue["date"].format("YYYY-MM-DD HH:mm"),
        };
        createMeeting(values);
        onClose();
    };

    const searchPlace = () => {
        setLocationSelected(null);
        if (locationToSearch) {
            const apiUrl = `https://nominatim.openstreetmap.org/search?q=${locationToSearch}&format=json`;
            fetcher(apiUrl).then((response) => {
                if (response) {
                    setResults(response);
                }
            });
        }
    };

    const handleOnLocationChange = (event) => {
        const { target } = event;
        setLocationToSearch(target.value);
    };

    const handleOnSelectResultItem = (resultItem) => {
        setLocationSelected(resultItem);
    };

    return (
        <>
            <Button fontWeight="medium" maxW="200px" onClick={onOpen}>
                Add Your Meeting
            </Button>
            <Modal
                visible={isOpen}
                title="Add Meeting"
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            onCreateMeeting(values);
                        })
                        .catch((info) => {
                            console.log("Validate Failed:", info);
                        });
                }}
                onCancel={onClose}
            >
                <Form form={form} name="control-hooks">
                    <Form.Item name="person" label="Person">
                        <Input type="textarea" />
                    </Form.Item>

                    <Form.Item name="date" label="Date">
                        <DatePicker showTime format="YYYY-MM-DD HH:mm" />
                    </Form.Item>
                    <Form.Item label="Search location">
                        <Input
                            type="text"
                            size="large"
                            onChange={handleOnLocationChange}
                            value={locationToSearch}
                            suffix={<SearchOutlined onClick={() => searchPlace()} />}
                        />
                    </Form.Item>

                    <div>
                        <ResultDisplayer
                            visible={!locationSelected}
                            results={results}
                            handleOnClick={handleOnSelectResultItem}
                        />
                    </div>

                    {locationSelected && (
                        <Form.Item>
                            <Input
                                suffix={
                                    <DeleteOutlined onClick={() => setLocationSelected(null)} />
                                }
                                type="text"
                                value={locationSelected.display_name}
                            />
                        </Form.Item>
                    )}
                </Form>
            </Modal>
        </>
    );
};

export default AddMeeting;
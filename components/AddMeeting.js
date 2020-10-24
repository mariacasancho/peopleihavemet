import { useState } from 'react';
import { Button, Modal, Form, Input, DatePicker } from 'antd';

import { createMeeting } from '../lib/db';

const AddMeeting = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [form] = Form.useForm();

    const onOpen = () => {
        setIsOpen(true);
    }

    const onClose = () => {
        setIsOpen(false);
    }

    const onCreateMeeting = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'date': fieldsValue['date'].format('YYYY-MM-DD HH:mm'),
        }
        createMeeting(values);
        onClose();
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
                            console.log('Validate Failed:', info);
                        });
                }}
                onCancel={onClose}
            >
                <Form form={form} name="control-hooks">
                    <Form.Item name="person" label="person">
                        <Input type="textarea" />
                    </Form.Item>

                    <Form.Item name="date" label="Date">
                        <DatePicker showTime format="YYYY-MM-DD HH:mm" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddMeeting;
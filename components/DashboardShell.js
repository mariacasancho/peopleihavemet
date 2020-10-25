import React from 'react';
import { Layout, Button, Avatar } from 'antd';
import AddMeeting from './AddMeeting';

import { useAuth } from '../lib/auth';

const DashboardShell = ({ children }) => {
    const { user, signout } = useAuth();
    const { Header, Content } = Layout;

    return (
        <Layout className="layout">
            <Header>

                {/* <AddMeeting /> */}
                <Button variant="ghost" mr={2} onClick={() => signout()}>
                    Log Out
            </Button>
                <Avatar size="sm" src={user.photoUrl} />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                {children}
            </Content>
        </Layout>
    );
};

export default DashboardShell;
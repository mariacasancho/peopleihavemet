
import useSWR from 'swr';
import 'antd/dist/antd.css';

import { useAuth } from '../lib/auth';
import EmptyState from '../components/EmptyState';
import DashboardShell from '../components/DashboardShell';
import MeetingTable from '../components/MeetingTable';

import fetcher from '../utils/fetcher';

const Dashboard = () => {
    const auth = useAuth();
    const { data } = useSWR('/api/meetings', fetcher);

    if (!auth.user) {
        return 'Loading...';
    }

    return (
        <DashboardShell>
            {data ?.meetings ? <MeetingTable meetings={data.meetings} /> : <EmptyState />}
        </DashboardShell>
    );
};

export default Dashboard;
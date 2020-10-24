
import useSWR from 'swr';
import { useAuth } from '../lib/auth';
import EmptyState from '../components/EmptyState';
import DashboardShell from '../components/DashboardShell';

import fetcher from '../utils/fetcher';

import 'antd/dist/antd.css';
import MeetingTable from '../components/MeetingTable';

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
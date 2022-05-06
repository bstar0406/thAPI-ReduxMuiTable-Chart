import Landing from './pages/landing';
import Table from './pages/table';
import Chart from './pages/chart';

const appRoutes = {
    home: {
        path: '/',
        title: 'Home',
        description: 'Home Page',
        requireLogin: true,
        Page: Landing,
    },
    table: {
        path: '/table',
        title: 'Table',
        description: 'Table Page',
        requireLogin: true,
        Page: Table,
    },
    chart: {
        path: '/chart',
        title: 'Chart',
        description: 'Chart Page',
        requireLogin: true,
        Page: Chart,
    },
};
export default appRoutes;


import { Box } from '@mui/material'
import SideBar from '../components/SideBar'
import { Routes, Route } from 'react-router-dom';
import Welcome from '../components/Welcome';
import ChatScreen from './ChatScreen';

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/:id/:name" element={<ChatScreen />} />
        </Routes>
    )
}

const HomeScreen = () => {
    return (
        <Box display="flex">
            <SideBar />
            <AllRoutes />
        </Box>
    )
}

export default HomeScreen

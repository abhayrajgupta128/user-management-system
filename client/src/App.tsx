import { Route, Routes } from "react-router-dom";
import axios from "axios";
import UserManagement from "./pages/UserManagement/UserManagementPage";
import UserVisualization from "./pages/UserVisualization/UserVisualizationPage";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.withCredentials = true;

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<UserVisualization />} />
      <Route path="/users" element={
        <UserManagement />} />
    </Routes>

  );
};

export default App;

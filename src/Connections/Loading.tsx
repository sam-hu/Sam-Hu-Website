import { Spin } from "antd";

const LoadingSpinner = () => <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
    <Spin size="large" />
</div>

export default LoadingSpinner;

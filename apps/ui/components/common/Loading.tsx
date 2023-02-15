import { Spin } from 'antd';

const Loading = () => {
  return (
    <div style={{ margin: '100px 0', textAlign: 'center', height: '10vh' }}>
      <Spin />
    </div>
  );
};

export default Loading;

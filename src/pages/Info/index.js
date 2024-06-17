import { Descriptions , Button } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Info = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const userinfo = user.userInfo;

    const onClick = () => {
        navigate('/user/setting');
    };

    useEffect(() => {
        if (!userinfo) {
            console.log("User info not found, redirecting...");
            navigate('/login');
        } else {
            console.log("User info found:");
            console.log(userinfo);
        }
    }, [userinfo, navigate]);

    // 构建基于userinfo的items数组
    const items = userinfo ? [
        {
            key: '1',
            label: '头像',
            children: userinfo.avatar ? <img src={"http://localhost:8001/assets/img/"+userinfo.avatar} alt="Avatar" style={{ width: "100px" }} /> : '无头像',
        },
        {
            key: '2',
            label: '昵称',
            children: userinfo.nick_name || '未设置昵称',
        },
        {
            key: '3',
            label: '用户名',
            children: userinfo.user_name || 'N/A',
            
        },
        {
            key: '4',
            label: '余额',
            children: userinfo.money,
        },
        {
            key: '5',
            label: '注册时间',
            children: new Date(userinfo.create_at * 1000).toLocaleDateString() || 'N/A', // 假设create_at是时间戳
        },
        {
            key: '6',
            label: '电子邮件',
            children: userinfo.email || '未提供',
        },
    ] : [];

    return (
        <div>
            <Descriptions title="用户信息" layout="vertical" bordered items={items} />
            <Button className=" mt-2 left-1/2 -translate-x-1/2" type="primary" onClick={onClick}>修改个人信息</Button>
        </div>

    );
}

export default Info;

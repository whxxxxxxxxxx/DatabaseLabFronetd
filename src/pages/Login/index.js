import {Card,Form,Input,Button,message} from 'antd';
import logo from '@/assets/logo.png';
import {useDispatch} from 'react-redux';
import {fetchLogin} from '@/store/modules/user';
import {useNavigate} from 'react-router-dom';

const Login = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        await dispatch(fetchLogin(values))
        navigate('/')
        message.success('登录成功')
    }
    const onRegister = ()=>{
        navigate('/register')
        message.warning('请先注册')
    }

    return (
    <div class="absolute inset-0 bg-center bg-cover bg-[url('/src/assets/login.png')]">
        <Card className='w-110 h-110 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-black'>
            <img className='w-40 h-40 block mt-0 mx-auto mb-1 ' src={logo} alt="" />
            <Form className='flex-col'  validateTrigger='onBlur' onFinish={onFinish} >
                <Form.Item 
                    name='mobile'
                    label='用户名'
                    rules={[
                        { required: true, message: '用户名不能为空' },
                        {
                            pattern: /^1[3-9]\d{9}$/,
                            message: '手机号格式不正确'
                        },]}
                >
                    <Input size='large' placeholder='请输入用户名'/>
                </Form.Item>
                <Form.Item
                    name='code'
                    label='密码'
                    rules={[
                        { required: true, message: '密码不能为空' }
                ]}
                >
                    <Input size='large' placeholder='请输入密码'/>
                </Form.Item>
                <Form.Item class='flex'>
                    <Button type='primary' htmlType='submit' size='large' block>登录</Button>
                </Form.Item>
                <Button  type='primary' onClick={onRegister} size='large' block>注册</Button>
            </Form>

        </Card>
    </div>)
}
export default Login;
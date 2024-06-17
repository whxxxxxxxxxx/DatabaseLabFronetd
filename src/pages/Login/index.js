import {Card,Form,Input,Button,message} from 'antd';
import logo from '@/assets/logo.png';
import {useDispatch} from 'react-redux';
import {fetchLogin} from '@/store/modules/user';
import {useNavigate} from 'react-router-dom';
import { loginAPI } from '@/apis/user'



const Login = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        loginAPI(values).then(res=>{
            console.log(res)
            dispatch(fetchLogin(res))
            if (res.code === 200) {
                navigate('/')
                message.success(res.message)
            }
            else{
                message.error(res.message)
            }
        })
    }
    const onRegister = ()=>{
        navigate('/register')
    }

    return (
    <div className="absolute inset-0 bg-center bg-cover bg-[url('/src/assets/login.png')]">
        <Card className='w-110 h-110 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-black'>
            <img className='w-40 h-40 block mt-0 mx-auto mb-1 ' src={logo} alt="" />
            <Form className='flex-col'  validateTrigger='onBlur' onFinish={onFinish} >
                <Form.Item 
                    name='user_name'
                    label='用户名'
                    rules={[
                        { required: true, message: '用户名不能为空' },
                    ]}
                >
                    <Input size='large' placeholder='请输入用户名'/>
                </Form.Item>
                <Form.Item
                    name='password'
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
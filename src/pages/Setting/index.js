import {useSelector} from 'react-redux';
import { useState } from 'react';
import {Card,Form,Input,Button,message,Upload} from 'antd';
import {fetchLogin, fetchUserInfo} from '@/store/modules/user';
import { UpdateProfileAPI } from '@/apis/user'
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

const Setting = () => {
    const user = useSelector(state => state.user);
    const userinfo = user.userInfo;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const onChange =(value)=>{
        setFileList(value.fileList)
    }

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        const {nick_name, email} = values
        const reqData = {
            nick_name,
            email,
            avatar: fileList[0].response.data?fileList[0].response.data:""
        }
        UpdateProfileAPI(reqData).then(res=>{
            console.log(res)
            if (res.code === 200) {
                
                navigate('/user/info')
                message.success(res.message)
            }
            else{
                message.error(res.message)
            }
        })
    }


    return (
        <div>
             <Card className='w-120 h-92 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-black'>
            <Form   validateTrigger='onBlur' 
                    initialValues={{ nick_name: userinfo.nick_name, user_name: userinfo.user_name, email: userinfo.email}}  
                    onFinish={onFinish} 
                    >
                <Form.Item 
                    name='avater'
                    label='上传头像'
                
                >
                    <Upload
                        label='头像'
                        action="http://localhost:8001/common/upload"
                        method='post'
                        listType="picture-card"
                        maxCount={1}
                        fileList={fileList}
                        onChange={onChange}
                        // onPreview={onPreview}
                    >
                    {'+ Upload'}
                    </Upload>
                </Form.Item>

                <Form.Item 
                    name='nick_name'
                    label='昵称'
                >
                    <Input size='large' placeholder='请输入昵称'/>
                </Form.Item>
                <Form.Item 
                    name='email'
                    label='邮箱'
                >
                    <Input size='large' placeholder='请输入邮箱'/>
                </Form.Item>


                <Form.Item className='flex justify-center items-center'>
                    <Button type='primary' htmlType='submit' size='large' block>保存</Button>
                </Form.Item>
            </Form>

        </Card>
        </div>

    );
}

export default Setting;
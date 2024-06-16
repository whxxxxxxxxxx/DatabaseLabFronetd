import {Card,Form,Input,Button,Upload} from 'antd';
import {useState} from 'react';
const Register = () => {
    const [fileList, setFileList] = useState([]);
    return (
        <div class="absolute inset-0 bg-center bg-cover bg-[url('/src/assets/login.png')]">
        <Card className='w-120 h-120 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-black'>
            <Form   validateTrigger='onBlur'  >
                <Form.Item 
                    name='mobile'
                    label='上传头像'
                    rules={[
                        { required: true, message: '请上传头像' },]}
                >
                    <Upload
                        label='头像'
                        action=""
                        listType="picture-card"
                        maxCount={1}
                        fileList={fileList}
                        // onChange={onChange}
                        // onPreview={onPreview}
                    >
                    {'+ Upload'}
                    </Upload>
                </Form.Item>

                <Form.Item 
                    name='nick_name'
                    label='昵称'
                    rules={[
                        { required: true, message: '请输入昵称' },]}
                >
                    <Input size='large' placeholder='请输入昵称'/>
                </Form.Item>

                <Form.Item 
                    name='user_name'
                    label='用户名'
                    rules={[
                        { required: true, message: '用户名不能为空' },]}
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

                <Form.Item 
                    name='email'
                    label='邮箱'
                >
                    <Input size='large' placeholder='请输入邮箱'/>
                </Form.Item>


                <Form.Item class='flex'>
                    <Button type='primary' htmlType='submit' size='large' block>注册</Button>
                </Form.Item>
            </Form>

        </Card>
    </div>
    )
}

export default Register
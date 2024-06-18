import React, { useState } from 'react';
import { useEffect } from 'react';
import { getProductDetailApi, updateProductApi } from '@/apis/product';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Upload,
  message
} from 'antd';
import {useParams} from 'react-router-dom';
import {publishProductApi} from '@/apis/product';
import {useNavigate} from 'react-router-dom';
const { TextArea } = Input;
const ProductEdit = () => {
    const [form] = Form.useForm();
    const {id} = useParams("id")
    const navigate = useNavigate();
    const [imgfileList, setImgFileList] = useState([]);
    const [imgInfoFileList, setImgInfoFileList] = useState([]);
    const [imgParamFileList, setImgParamFileList] = useState([]);
    const [change , setChange] = useState(false);

    useEffect(() => {
        async function fetchProductDetail() {
            const res = await getProductDetailApi(id);
            form.setFieldsValue(res.data);
        }
        fetchProductDetail();
    }, [id]);

    const onChange = (value) => {
        setImgFileList(value.fileList);
        setChange(true);
    };
    const onChangeInfo = (value) => {
        setImgInfoFileList(value.fileList);
    };
    const onChangeParam = (value) => {
        setImgParamFileList(value.fileList);
    };
    const onFinish = (values) => {
        console.log('Received values:', values);
        const reqData = {
            idData: id,
            product_name: values.product_name,
            category_id: Math.max(0, parseInt(values.category_id, 10)),
            title: values.title,
            img_path: change?imgfileList[0].response.data : values.img_path,
            info: values.info,
            price: values.price,
            discount_price: values.discount_price,
            on_sale: values.on_sale,
            num: values.num,
        };
        console.log(reqData);
        updateProductApi(reqData).then(res => {
            console.log(res);
        });
        message.success('修改成功');
        navigate('/product/list');
    };
    return (
        <div className='block justify-center items-center'>
            <Form
                form = {form}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                    style={{
                maxWidth: 600,
                }}
                onFinish={onFinish}
            >
            <Form.Item name="product_name" label="商品名称">
            <Input />
            </Form.Item>
            <Form.Item name="category_id" label="商品类别">
            <Select>
                <Select.Option value="1">服装</Select.Option>
                <Select.Option value="2">水果</Select.Option>
                <Select.Option value="3">数码</Select.Option>
                <Select.Option value="4">家具</Select.Option>
                <Select.Option value="5">电器</Select.Option>
                <Select.Option value="6">零食</Select.Option>
                <Select.Option value="7">美妆</Select.Option>
                <Select.Option value="8">医药</Select.Option>
                <Select.Option value="9">运动</Select.Option>
                <Select.Option value="10">饰品</Select.Option>
                <Select.Option value="11">鞋包</Select.Option>
            </Select>
            </Form.Item>
            <Form.Item name="title" label="商品链接标题">
                <Input />
            </Form.Item>
            <Form.Item name="img" label="商品大图">
                <Upload
                    label='商品大图'
                    action="http://localhost:8001/common/upload"
                    // action="http://192.168.50.89:8001/common/upload"
                    method='post'
                    listType="picture-card"
                    maxCount={1}
                    fileList={imgfileList}
                    onChange={onChange}
                >
                {'+ Upload'}
                </Upload>
            </Form.Item>

            <Form.Item name="info" label="商品介绍">
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item name="imgInfo" label="商品介绍图">
                <Upload
                    label='商品介绍图'
                    action="http://localhost:8001/common/upload"
                    method='post'
                    listType="picture-card"
                    maxCount={5}
                    fileList={imgInfoFileList}
                    onChange={onChangeInfo}
                >
                {'+ Upload'}
                </Upload>
            </Form.Item>

            <Form.Item name="imgParam" label="商品参数图">
                <Upload
                    label='商品参数图'
                    action="http://localhost:8001/common/upload"
                    method='post'
                    listType="picture-card"
                    maxCount={5}
                    fileList={imgParamFileList}
                    onChange={onChangeParam}
                >
                {'+ Upload'}
                </Upload>
            </Form.Item>


            <Form.Item name="price" label="商品定价">
                <InputNumber />
            </Form.Item>

            <Form.Item name="discount_price" label="商品折扣价">
                <InputNumber />
            </Form.Item>
            
            <Form.Item name="on_sale" label="商品打折" valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item name="num" label="库存数量">
                <InputNumber />
            </Form.Item>

            <Form.Item>
                    <Button className=' left-10' type='primary' htmlType='submit' size='large' block>完成编辑</Button>
            </Form.Item>

           
        </Form>
        </div>

        
  );
};

export default ProductEdit;
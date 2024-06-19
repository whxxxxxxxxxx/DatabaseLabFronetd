import React from 'react';
import { Card, List, Descriptions ,Input ,Button,Space,Select} from 'antd';
import { EditOutlined, EllipsisOutlined,DeleteOutlined} from '@ant-design/icons';
import { useEffect,useState } from 'react';
import {getProductListApi} from '@/apis/product';
import { useSelector } from 'react-redux';
import {deleteProductApi} from '@/apis/product';
import {useNavigate} from 'react-router-dom';
import "./index.css";
const ProductList = () => {
    const navigate = useNavigate();
    const userId = useSelector(state => state.user.userInfo.id);
    const categories = {
        1: '服装',
        2: '水果',
        3: '数码',
        4: '家具',
        5: '电器',
        6: '零食',
        7: '美妆',
        8: '医药',
        9: '运动',
        10: '饰品',
        11: '鞋包',
      };

    const [listdata, setListData] = useState([])
    const [change, setChange] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const onSearch = () => {
        console.log(inputValue);
        async function fetchProductList() {
            const res = await getProductListApi({product_name: inputValue});
            console.log(res.data);
            setListData(res.data || []);
        }
        fetchProductList();
    }

    const onCategoryChange = (value) => {
        console.log(value);
        const valueInt = parseInt(value, 10);
        async function fetchProductList() {
            const res = await getProductListApi({category_id: valueInt});
            console.log(res.data);
            setListData(res.data);
        }
        fetchProductList();
    }

    useEffect(() => {
        async function fetchProductList() {
            const res = await getProductListApi();
            console.log(res.data);
            setListData(res.data);
        }
        fetchProductList();
    }, [change, navigate]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const onClickEllipsis = (id) => {
        console.log('ellipsis clicked');
        navigate(`/product/detail/${id}`);
    }

    const onClickDelete = (id) => {
        console.log('delete clicked');

        async function deleteProduct() {
            const res = await deleteProductApi(id);
            console.log(res);
            setChange(!change);
        }
        deleteProduct();
    }

    const onClickEdit = (id) => {
        console.log('edit clicked');
        navigate(`/product/edit/${id}`);
    }
    return(
        <div>
            <Space className='w-full'>
                <Space.Compact>
                    <Input placeholder="搜索商品名称" onChange={handleInputChange}/>
                    <Button type="primary" onClick={onSearch}>搜索</Button>
                </Space.Compact>

                <Space.Compact className='mr-0'> 
                    <Select placeholder='类别' size='large' onChange={onCategoryChange} >
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
                </Space.Compact>
            </Space>
            {listdata !== null ? (
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                    }}
                    dataSource={listdata}
                    renderItem={(item) => (
                    
                    <List.Item>
                        <Card
                            className=' w-full'
                            cover={
                                <img
                                    alt="王文杰的作业"
                                    src={`http://localhost:8001/assets/img/${item.img_path}`}
                                />
                            }
                            actions={[
                                <EllipsisOutlined key="ellipsis" onClick={() => onClickEllipsis(item.id)} />,
                                userId === item.boss_id && <DeleteOutlined key="delete" onClick={() => onClickDelete(item.id)}/>,
                                userId === item.boss_id && <EditOutlined key="edit" onClick={() => onClickEdit(item.id)}/>,
                            ]}
                        >
                            <Descriptions 
                                title="商品信息"
                                column={2}
                                items={
                                    [
                                        {
                                            key: '1',
                                            label: '商品名称',
                                            children: item.product_name
                                        },
                                        {
                                            key: '2',
                                            label: '商品标题',
                                            children: item.title
                                        },
                                        {
                                            key: '3',
                                            label: '商品原价',
                                            children: item.price
                                        },
                                        {
                                            key: '4',
                                            label: '商品折扣价',
                                            children: item.discount_price
                                        },
                                        {
                                            key: '5',
                                            label: '折扣中',
                                            children: item.on_sale ? '是' : '否'
                                        },
                                        {
                                            key: '6',
                                            label: '商品类别',
                                            children: categories[item.category_id]
                                        }

                                    ]
                                }
                            />
                        </Card>
                        
                    </List.Item>
                )}
                />
            ) : (
                <div>没有找到商品</div> // 或者其他适当的空状态显示
            )}
            
        </div>
    )
}



    

export default ProductList;
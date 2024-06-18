import React from 'react';
import { Card, List, Descriptions } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined,DeleteOutlined} from '@ant-design/icons';
import { useEffect,useState } from 'react';
import {getProductListApi} from '@/apis/product';
import { useSelector } from 'react-redux';
import {deleteProductApi} from '@/apis/product';
import {useNavigate} from 'react-router-dom';
const { Meta } = Card;
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

    useEffect(() => {
        async function fetchProductList() {
            const res = await getProductListApi();
            console.log(res.data);
            setListData(res.data);
        }
        fetchProductList();
    }, [change, navigate]);

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
        </div>
    )
}



    

export default ProductList;
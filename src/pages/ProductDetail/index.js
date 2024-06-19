import {useParams} from 'react-router-dom';
import { useEffect,useState } from 'react';
import { getProductDetailApi } from '@/apis/product';
import { Descriptions } from 'antd';

const ProductDetail = () => {
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
    //从param获取id
    const { id } = useParams("id");
    const [product, setProduct] = useState({});
    useEffect(() => {
        async function fetchProductDetail() {
            const res = await getProductDetailApi(id);
            console.log(res.data);
            setProduct(res.data);
        }
        fetchProductDetail();
    }, [id]);
    
    const items = product ? [
        {
            key: '1',
            label: '商品大图',
            children: product.img_path ? <img src={"http://localhost:8001/assets/img/"+product.img_path} alt="Avatar" style={{ width: "100px" }} /> : '无大图',
        },
        {
            key: '8',
            label: '商品名称',
            children: product.product_name || '未设置名称',
        },
        {
            key: '9',
            label: '商品标题',
            children: product.title || '未设置标题',
        },
        {
            key: '2',
            label: '商品类别',
            children: categories[product.category_id] || '未设置类别',
        },
        {
            key: '3',
            label: '价格',
            children: product.price || 'N/A',
            
        },
        {
            key: '4',
            label: '折扣价',
            children: product.discount_price || 'N/A',
        },
        {
            key: '5',
            label: '商品详情',
            children: product.info
        },
        {
            key: '6',
            label: '商品库存',
            children: product.num || '未提供',
        },
        {
            key: '7',
            label: '是否折扣中',
            children: product.on_sale ? '是' : '否',
        },
    ] : [];

    return (
        <div>
            <Descriptions title="商品详情" layout="vertical" bordered items={items} />
        </div>

    );
}

export default ProductDetail;
import { Layout, Menu, Popconfirm } from 'antd'
import {
  LogoutOutlined,
  UserOutlined,
  ShoppingOutlined,
  InboxOutlined,
  UploadOutlined
} from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo, clearUserInfo } from '@/store/modules/user'


const { Header, Sider } = Layout

const items = [
  {
    label: '用户信息',
    key: '/user/info',
    icon: <UserOutlined />,
  },
  {
    label: '发布商品',
    key: '/publish',
    icon: <UploadOutlined />,
  },
  {
    label: '商品列表',
    key: '/product/list',
    icon: <ShoppingOutlined />,
  },
  {
    label: '订单管理',
    key: '/order',
    icon: <InboxOutlined />,
  },
]

const GeekLayout = () => {
  const navigate = useNavigate()
  const onMenuClick = (route) => {
    console.log('菜单被点击了', route)
    const path = route.key
    navigate(path)
  }

  

  // 反向高亮
  // 1. 获取当前路由路径
  const location = useLocation()
  const selectedkey = location.pathname

  // 触发个人用户信息action
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserInfo())
    if (location.pathname === '/')
    navigate('/user/info')
  }, [dispatch])

  // 退出登录确认回调
  const onConfirm = () => {
    console.log('确认退出')
    dispatch(clearUserInfo())
    navigate('/login')
  }

  const name = useSelector(state => state.user.userInfo.nick_name)
  return (
    <Layout className='h-full'>
      <Header className="h-24 p-0">
        <div className="w-24 h-24 bg-[url('/src/assets/logo.png')] bg-cover bg-clip-content" />
        <div className="absolute right-0 top-0 pr-5 text-white">
          <span className="mr-5">{name}</span>
          <span className="inline-block cursor-pointer">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="light"
            selectedKeys={selectedkey}
            onClick={onMenuClick}
            items={items}
            style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className=" overflow-y-auto" style={{ padding: 20 }}>
          {/* 二级路由的出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout
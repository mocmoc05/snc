import React from 'react';
import Assessment from 'material-ui/svg-icons/action/assessment';
import GridOn from 'material-ui/svg-icons/image/grid-on';
import Web from 'material-ui/svg-icons/av/web';
import { cyan600, pink600, purple600 } from 'material-ui/styles/colors';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentSave from 'material-ui/svg-icons/content/save';


const data = {
  appName: "Ứng dụng quản lý khóa học",
  apiUri: "http://localhost:3002/api",
  appUri: "http://localhost:3002",
  user: {
    columns: [
      {
        field: "_id",
        text: "Mã user",
        width: "30%",
        hidden: true,
        priKey: true,
        type: "TEXT"
      },
      {
        field: "username",
        text: "Tên đăng nhập",
        width: "60%",
        hidden: false,
        showGrid: true,
        type: "TEXT"
      },
      {
        field: "password",
        text: "Mật khẩu",
        width: "60%",
        hidden: false,
        showGrid: false,
        type: "PASS"
      },
      {
        field: "fullname",
        text: "Họ và tên",
        width: "60%",
        hidden: false,
        showGrid: true,
        type: "TEXT"
      },
      {
        field: "email",
        text: "Email",
        width: "60%",
        hidden: false,
        showGrid: true,
        type: "EMAIL"
      },
      {
        field: "phone",
        text: "SĐT",
        width: "60%",
        hidden: false,
        showGrid: true,
        type: "TEXT"
      }
    ],
    action: {
      delete: {
        apiUri: "/deleteUser",
        text: "Xóa",
        icon: <ActionDelete />
      },
      create: {
        form:"/createuser",
        apiUri: "/register",
        text: "Thêm",
        icon: <ContentCreate />
      },
      update: {
        form:"/updateroom",
        apiUri: "/saveUser",
        text: "Sửa",
        icon: <ContentSave />
      }
    }
  },
  room: {
    columns: [
      {
        field: "_id",
        text: "Mã",
        hidden: true,
        showGrid: false,
        priKey: true
      },
      {
        field: "title",
        text: "Tên khóa học",
        hidden: false,
        type: "TEXT",
        showGrid: true
      },
      {
        field: "desc",
        text: "Mô tả",
        hidden: false,
        type: "TEXT",
        showGrid: true
      },
      {
        field: "content",
        text: "Nội dung khóa học",
        hidden: false,
        type: "HTML",
        showGrid: false
      },
      {
        field: "users",
        text: "Danh sách thành viên",
        hidden: false,
        type: "CKL",
        dataUri:"/users",
        dataKey:"_id",
        dataDisplay:"username",
        showGrid: false
      },

    ],
    action: {
      delete: {
        apiUri: "/deleteroom",
        text: "Xóa",
        icon: <ActionDelete />
      },
      create: {
        form:"/createroom",
        apiUri: "/createroom",
        text: "Thêm",
        icon: <ContentCreate />
      },
      update: {
        form:"/updateroom",
        apiUri: "/saveroom",
        text: "Sửa",
        icon: <ContentSave />
      }
    }
  },
  menus: [
    { text: 'Trang chủ', icon: <Assessment />, link: '/dashboard' },
    { text: 'Quản lý thành viên', icon: <Web />, link: '/users' },
    { text: 'Quản lý khóa học', icon: <GridOn />, link: '/rooms' }
    // { text: 'Login Page', icon: <PermIdentity/>, link: '/login' },
    // { text: 'Map Page', icon: <AddLocation/>, link: '/maps' },
    // { text: 'Data Table Page', icon: <GridOn/>, link: '/datatable' }
  ],

  dashBoardPage: {
    recentProducts: [
      { id: 1, title: 'Samsung TV', text: 'Samsung 32 1080p 60Hz LED Smart HDTV.' },
      { id: 2, title: 'Playstation 4', text: 'PlayStation 3 500 GB System' },
      { id: 3, title: 'Apple iPhone 6', text: 'Apple iPhone 6 Plus 16GB Factory Unlocked GSM 4G ' },
      { id: 4, title: 'Apple MacBook', text: 'Apple MacBook Pro MD101LL/A 13.3-Inch Laptop' }
    ],
    monthlySales: [
      { name: 'Jan', uv: 3700 },
      { name: 'Feb', uv: 3000 },
      { name: 'Mar', uv: 2000 },
      { name: 'Apr', uv: 2780 },
      { name: 'May', uv: 2000 },
      { name: 'Jun', uv: 1800 },
      { name: 'Jul', uv: 2600 },
      { name: 'Aug', uv: 2900 },
      { name: 'Sep', uv: 3500 },
      { name: 'Oct', uv: 3000 },
      { name: 'Nov', uv: 2400 },
      { name: 'Dec', uv: 2780 }
    ],
    newOrders: [
      { pv: 2400 },
      { pv: 1398 },
      { pv: 9800 },
      { pv: 3908 },
      { pv: 4800 },
      { pv: 3490 },
      { pv: 4300 }
    ],
    browserUsage: [
      { name: 'Chrome', value: 800, color: cyan600, icon: <ExpandMore /> },
      { name: 'Firefox', value: 300, color: pink600, icon: <ChevronRight /> },
      { name: 'Safari', value: 300, color: purple600, icon: <ExpandLess /> }
    ]
  }
};

export default data;

import { createProduct, dashboard, logout, payment, profile, withdraw } from '../products';

export const navlinks = [
  {
    name: 'Dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'Ordered',
    imgUrl: withdraw,
    link: '/bought-product',
  },
 
  {
    name: 'Admin',
    imgUrl: payment,
    link: '/admin-page',
  },
];
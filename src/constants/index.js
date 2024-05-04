import { createAsset, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'Dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'Ordered',
    imgUrl: withdraw,
    link: '/bought-asset',
  },
 
  {
    name: 'Admin',
    imgUrl: payment,
    link: '/admin-page',
  },
];
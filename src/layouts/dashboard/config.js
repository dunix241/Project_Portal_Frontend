import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import {SvgIcon} from '@mui/material';
import {BookOpenIcon} from "@heroicons/react/20/solid";
import { ReceiptPercentIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';

export const items = [
  {
    title: 'Overview',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Customers',
    path: '/management/customers',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Products',
    path: '/management/products',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Categories',
    path: '/management/categories',
    icon: (
      <SvgIcon fontSize="small">
        <BookOpenIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Orders',
    path: '/management/orders',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingCartIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Coupons',
    path: '/management/coupons',
    icon: (
      <SvgIcon fontSize="small">
        <ReceiptPercentIcon/>
      </SvgIcon>
    )
  },
  // {
  //   title: 'Companies',
  //   path: '/management/companies',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ShoppingBagIcon/>
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Account',
  //   path: '/management/account',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserIcon/>
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Settings',
  //   path: '/settings',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CogIcon/>
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Login',
  //   path: '/auth/login',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LockClosedIcon/>
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Register',
  //   path: '/auth/register',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon/>
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Error',
  //   path: '/404',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon/>
  //     </SvgIcon>
  //   )
  // }
];

import {
  CartIcon,
  HouseIcon,
  MonitorIcon,
  OpenBoxIcon,
  ReceiptIcon,
  UserIcon,
  UsersThreeIcon,
} from 'common/assets';
import { Route } from 'containers/navigation';

import { NavigationRoutes } from './navigation-routes';

export const routes: Route[] = [
  {
    title: 'navigation:home',
    routeName: NavigationRoutes.Home,
    leftIcon: (color, size, weight) => (
      <HouseIcon color={color} size={size} weight={weight} />
    ),
  },
  {
    title: 'navigation:cashier',
    routeName: NavigationRoutes.Cashier,
    leftIcon: (color, size, weight) => (
      <MonitorIcon color={color} size={size} weight={weight} />
    ),
  },
  {
    title: 'navigation:transactions',
    routeName: NavigationRoutes.Transaction,
    leftIcon: (color, size, weight) => (
      <ReceiptIcon color={color} size={size} weight={weight} />
    ),
  },
  {
    title: 'navigation:inventories',
    routeName: NavigationRoutes.Inventory,
    leftIcon: (color, size, weight) => (
      <OpenBoxIcon color={color} size={size} weight={weight} />
    ),
  },
  {
    title: 'navigation:purchase-inventories',
    routeName: NavigationRoutes.PurchaseInventory,
    leftIcon: (color, size, weight) => (
      <CartIcon color={color} size={size} weight={weight} />
    ),
  },
  {
    title: 'navigation:customers',
    routeName: NavigationRoutes.Customer,
    leftIcon: (color, size, weight) => (
      <UserIcon color={color} size={size} weight={weight} />
    ),
  },
  {
    title: 'navigation:suppliers',
    routeName: NavigationRoutes.Supplier,
    leftIcon: (color, size, weight) => (
      <UsersThreeIcon color={color} size={size} weight={weight} />
    ),
  },
  {
    title: 'navigation:users',
    routeName: NavigationRoutes.User,
    leftIcon: (color, size, weight) => (
      <UserIcon color={color} size={size} weight={weight} />
    ),
  },
];

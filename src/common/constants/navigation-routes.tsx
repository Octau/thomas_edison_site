export enum NavigationRoutes {
  Home = 'home',

  Cashier = 'cashier',
  CashierCart = 'cashier/cart',

  Inventory = 'inventories',

  PurchaseInventory = 'purchase-inventories',
  PurchaseInventoryCreate = 'purchase-inventories/create',
  PurchaseInventoryView = 'purchase-inventories/:id',

  Supplier = 'suppliers',
  Customer = 'customers',

  Transaction = 'transactions',
  TransactionView = 'transactions/:id',

  User = 'users',
  UserView = 'users/:id',
}

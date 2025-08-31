export interface FormDataLogin {
  phone: string;
  password: string;
}

export interface User {
  accessToken: string;
  code: string;
  email: string;
  name: string;
  phone: string;
  profileImage: string;
  roleCode: string;
  roleName: string;
}

export interface DetailsCustomer {
  code: string;
  name: string;
  type: string;
  companyType: string;
  identityNo: string;
  npwp: string;
  email: string;
  phone: string;
  mobilePhone: string;
  area: string;
  province: {
    code: string;
    name: string;
  };
  city: {
    code: string;
    name: string;
  };
  address: string;
  group: {
    code: string;
    name: string;
  };
  status: string;
  target: string;
  achievement: string;
  percentage: string;
}

export interface Customer {
  code: string;
  name: string;
  type: string;
  companyType: string;
  areaCode: string;
  province: {
    code: string;
    name: string;
  };
  city: {
    code: string;
    name: string;
  };
  subdistrict: string;
  address: string;
}

// for all transaction
export interface Transaction {
  referenceNo: string;
  customer: {
    code: string;
    name: string;
  };
  sales: string;
  amountDue: string;
  amountUntaxed: string;
  amountTotal: string;
  dateOrder: string;
  dateDue: string;
  paidAt: string;
}

export interface TransactionResponse {
  items: Transaction[];
  currentPage: number;
  perPage: number;
  lastPage: number;
  total: number;
}

// For detail transaction
export interface TransactionItems {
  productName: string;
  quantity: string;
  price: string;
  discount: string;
  priceSubtotal: string;
  marginSubtotal: string;
}

export interface DetailsTransactionProps {
  referenceNo: string;
  customer: {
    code: string;
    name: string;
  };
  sales: string;
  items: TransactionItems[];
  amountDue: string;
  amountUntaxed: string;
  amountTotal: string;
  dateOrder: string;
  dateDue: string;
  paidAt: string;
}

export interface DailyTransactionsItems {
  items: {
    date: string;
    amount: string;
  };
}

export interface DailyTransactionsProps {
  items: DailyTransactionsItems[];
}

export interface MonthlyTransactionItems {
  month: string;
  current: string;
  previous: string;
  growth: string;
}

export interface MonthlyTransactionProps {
  items: MonthlyTransactionItems[];
}

export interface YearlyTransactionProps {
  percentage: string;
  current: {
    year: string;
    amount: string;
  };
  previous: {
    year: string;
    amount: string;
  };
}

export interface TopCustomerItems {
  customer: {
    code: string;
    name: string;
    companyType: string;
  };
  amount: string;
}

export interface TopCustomerProps {
  items: TopCustomerItems[];
}

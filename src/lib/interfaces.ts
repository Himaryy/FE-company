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

export interface SignInResponse {
  responseCode: string;
  responseMessage: string;
  accessToken: string;
}

export interface RegisterResponse {
  responseCode: string;
  responseMessage: string;
}

export interface LogoutResponse {
  responseCode: string;
  responseMessage: string;
}

export interface ChangePasswordResponse {
  responseCode: string;
  responseMessage: string;
}

export interface RegisterUser {
  name: string;
  phone: string;
  email: string;
  address: string;
  password: string;
}

export interface ListProvinceItems {
  code: string;
  name: string;
}

export interface ListProvinceResponse {
  responseCode: string;
  responseMessage: string;
  items: ListProvinceItems[];
}

export interface ListCitiesItems {
  code: string;
  name: string;
}

export interface ListCitiesResponse {
  responseCode: string;
  responseMessage: string;
  items: ListProvinceItems[];
}

export interface ListSalesItems {
  code: string;
  name: string;
}

export interface ListSalesResponse {
  responseCode: string;
  responseMessage: string;
  items: ListProvinceItems[];
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

export interface CustomerAddResponse {
  responseCode: string;
  responseMessage: string;
}

export interface CustomerEditResponse {
  responseCode: string;
  responseMessage: string;
}

export interface CustomerItems {
  code: string;
  name: string;
  type: string;
  companyType: string;
  area: string;
  province: string;
  city: string;
  group: {
    code: string;
    name: string;
  };
  status: string;
  target: string;
  achievement: string;
  percentage: string;
}

export interface CustomerParams {
  page: number;
  perPage: number;
  sortBy: string;
  sortDirection: string;
  endDate: string;
  startDate: string;
}

export interface CustomerResponse {
  items: CustomerItems[];
  currentPage: number;
  perPage: number;
  lastPage: number;
  total: number;
}

export interface CustomerByCode {
  code: string;
  name: string;
  type: string;
  companyType: string;
  identityNo: string;
  npwp: string;
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

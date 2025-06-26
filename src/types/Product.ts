export interface Product {
  id: string;
  srNo: number;
  productName: string;
  description: string;
  tenderNo: string;
  dueDate: string;
  dueTime: string;
  emdAmount: string;
  bankName: string;
  rtgsCode: string;
  ssiNsicMsme: string;
  iso: string;
  turnover: string;
  tenderFormAmt: string;
  contactEmail: string;
  imageUrl: string;
  createdAt: Date;
}

export interface AdminCredentials {
  username: string;
  password: string;
}
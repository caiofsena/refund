export type Receipt = {
  id: string;
  originalFilename: string;
  filename: string;
  path: string;
  extname: string;
  refundId?: string;
  createdAt: string;
  updatedAt: string;
};

export type ReceiptResponse = {
  receipt: Receipt;
};

export type ReceiptDownloadResponse = {
  url: string;
};

export type DeleteReceiptResponse = {
  message: string;
};

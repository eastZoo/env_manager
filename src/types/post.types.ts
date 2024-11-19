export interface MerchantNewsListType {
  title: string;
  id: string;
  content: string;
  created_at: string;
  name: string;
  comments: CommentsType[];
  user: UserType;
}

export interface CommentsType {
  content: string;
  createdAt: string;
  id: string;
  postId: string;
  updatedAt: string;
  user: UserType;
}

export interface UserType {
  approvalStatus: string;
  createdAt: string;
  id: string;
  name: string;
  password: string;
  phoneNumber: string;
  storeId: string;
  updatedAt: string;
  userId: string;
  userType: string;
}

/** 아나바다 게시글  */
export interface AnavadaType {
  title: string;
  id: string;
  content: string;
  createdAt: string;
  name: string;
  comments: CommentsType[];
  files: FilesType[];
  user: UserType;
}

export interface FilesType {
  createdAt: string;
  filename: string;
  id: string;
  mimetype: string;
  originalname: string;
  path: string;
  postId: string;
  size: number;
  updatedAt: string;
}

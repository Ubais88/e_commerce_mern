
export interface NewUserRequestBody {
  _id: string;
  name: string;
  email: string;
  photo: string;
  gender: string;
  dob: Date;
}

export interface Params {
  id: string;
}

export interface NewProductRequestBody {
  name: string;
  category: string;
  price: number;
  stock: number;
}

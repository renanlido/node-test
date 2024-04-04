type Address = {
  id: number;
  street: string;
  streetName: string;
  buildingNumber: string;
  city: string;
  zipcode: string;
  country: string;
  county_code: string;
  latitude: number;
  longitude: number;
};

export type Contact = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  birthday: string; // ou `Date` se você preferir trabalhar com objetos Date
  gender: string;
  address: Address;
  website: string;
  image: string;
};

export type Company = {
  id: number;
  name: string;
  email: string;
  vat: string;
  phone: string;
  country: string;
  addresses: Address[];
  website: string;
  image: string;
  contact: Contact;
};

export type Response<T> = {
  status: string;
  code: number;
  total: number;
  data: T;
};

export type Client = {
  name: string;
  email: string;
  phone: string;
  person: {
    fullName: string;
  };
};

export type Output = {
  total: number;
  client: Client[];
};

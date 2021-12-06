export type CartDetails = {
  currency: string;
  items: CartLineItem[];
};

export type CartLineItems = {
  items: CartLineItem[];
};

export type CartLineItem = {
  sku: string;
  quantity: number;
};

export type AddressDetails = {
  id?: string;
  key?: string;
  firstName?: string;
  lastName?: string;
  streetName?: string;
  postalCode?: string;
  city?: string;
  region?: string;
  state?: string;
  country?: string;
  building?: string;
  apartment?: string;
  phone?: string;
  mobile?: string;
  email?: string;
}

import { Cart } from '@commercetools/typescript-sdk';
import { CartDetails, CartLineItems, AddressDetails } from '../types/cart-details';
import { CommerceToolsProvider } from './CommerceToolsProvider';

export class CartProvider {
  constructor(
    private readonly ctp: CommerceToolsProvider
  ) {}

  async createCart(cartDetails: CartDetails): Promise<Cart> {
      console.log('Cart Provider: Create Cart Invoking...');

      return this.ctp.createCart(cartDetails);
  }

  async addLineItems(cartId: string, cartLineItems: CartLineItems): Promise<Cart> {
    console.log('Cart Provider: Add Line Items Invoking...');

    const existingCart = await this.ctp.getCart(cartId);

    const updateActions = cartLineItems.items.map(lineItem => {
      const existingLineItem = existingCart.lineItems.find(item => item.variant.sku == lineItem.sku);
      if (existingLineItem) {
        return {
          action: 'changeLineItemQuantity',
          lineItemId: existingLineItem.id,
          quantity: existingLineItem.quantity + lineItem.quantity
        };
      }
      return {
        action: 'addLineItem',
        sku: lineItem.sku,
        quantity: lineItem.quantity
      };
    });
    return this.ctp.updateCart(existingCart, updateActions);
  }

  async addDiscountCode(cartId: string, discountCode: string): Promise<Cart> {
    console.log('Cart Provider: Add Discount Code Invoking...');

    const existingCart = await this.ctp.getCart(cartId);

    const updateActions = [{
      action: 'addDiscountCode',
      code: discountCode
    }];

    return this.ctp.updateCart(existingCart, updateActions);
  }

  async setShippingAddress(cartId: string, addressDetails: AddressDetails): Promise<Cart> {
    console.log('Cart Provider: Set Shipping Address Invoking...');

    const existingCart = await this.ctp.getCart(cartId);

    const updateActions = [{
      action: 'setShippingAddress',
      address: addressDetails
    }];

    return this.ctp.updateCart(existingCart, updateActions);
  }

  async setShippingMethod(cartId: string, shippingMethodId: string): Promise<Cart> {
    console.log('Cart Provider: Set Shipping Method Invoking...');

    const existingCart = await this.ctp.getCart(cartId);

    const updateActions = [{
      action: 'setShippingMethod',
      shippingMethod : {
        id : shippingMethodId,
        typeId : 'shipping-method'
      }
    }];

    return this.ctp.updateCart(existingCart, updateActions);
  }

  async setPaymentMethod(cartId: string, paymentMethodId: string): Promise<Cart> {
    console.log('Cart Provider: Set Payment Method Invoking...');

    const existingCart = await this.ctp.getCart(cartId);

    const updateActions = [{
      action: 'addPayment',
      payment : {
        id : paymentMethodId,
        typeId : 'payment'
      }
    }];

    return this.ctp.updateCart(existingCart, updateActions);
  }
}

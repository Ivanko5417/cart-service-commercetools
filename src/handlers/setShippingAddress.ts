import { APIGatewayProxyHandler } from 'aws-lambda';
import { HttpResponse } from '../helpers/HttpResponse';
import { CartProvider } from '../providers';
import { CommerceToolsProvider } from 'providers/CommerceToolsProvider';

const ctpProvider = new CommerceToolsProvider(
  process.env as { [key: string]: string }
);

const cartProvider = new CartProvider(ctpProvider);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    console.log('Set Shipping Address Lambda: Incoming Event: ', JSON.stringify(event));

    const cartId = event.pathParameters.id;
    const addressDetails = JSON.parse(event.body as string);

    console.log('Set Shipping Address Lambda: Cart Id: ', cartId);
    console.log('Set Shipping Address Lambda: Address: ', addressDetails);

    const result = await cartProvider.setShippingAddress(cartId, addressDetails.address);

    console.log('Set Shipping Address Lambda: Cart Updated: ', result);

    return HttpResponse.success(result);
  } catch (e) {
    console.error('Set Shipping Address Lambda: Error Encountered: ', e);
    return HttpResponse.serverError(e);
  }
};

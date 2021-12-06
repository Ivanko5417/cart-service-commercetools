import { APIGatewayProxyHandler } from 'aws-lambda';
import { HttpResponse } from '../helpers/HttpResponse';
import { CartProvider } from '../providers';
import { CommerceToolsProvider } from 'providers/CommerceToolsProvider';

const ctsProvider = new CommerceToolsProvider(
  process.env as { [key: string]: string }
);

const cartProvider = new CartProvider(ctsProvider);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    console.log('Set Shipping Method Lambda: Incoming Event: ', JSON.stringify(event));

    const cartId = event.pathParameters.id;
    const shippingMethodDetails = JSON.parse(event.body as string);

    console.log('Set Shipping Address Lambda: Cart Id: ', cartId);
    console.log('Set Shipping Address Lambda: Shipping Method: ', shippingMethodDetails);

    const result = await cartProvider.setShippingMethod(cartId, shippingMethodDetails.shippingMethodId);

    console.log('Set Shipping Method Lambda: Cart Updated: ', result);

    return HttpResponse.success(result);
  } catch (e) {
    console.error('Set Shipping Method Lambda: Error Encountered: ', e);
    return HttpResponse.serverError(e);
  }
};

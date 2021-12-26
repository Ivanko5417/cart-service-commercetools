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
    console.log('Get Cart Lambda: Incoming Event: ', JSON.stringify(event));

    const cartId = event.pathParameters?.id as string;

    const result = await cartProvider.getCart(cartId);
    console.log('Get Cart Lambda: Cart Updated: ', result);

    return HttpResponse.success(result);
  } catch (e) {
    console.error('Get Cart Lambda: Error Encountered: ', e);
    return HttpResponse.serverError(e);
  }
};

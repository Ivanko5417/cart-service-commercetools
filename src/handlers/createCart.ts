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
    console.log('Create Cart Lambda: Incoming Event: ', JSON.stringify(event));

    const cartDetails = JSON.parse(event.body as string);

    console.log('Create Cart Lambda: Cart Details: ', cartDetails);

    const result = await cartProvider.createCart(cartDetails);

    console.log('Create Cart Lambda: Cart Created: ', result);

    return HttpResponse.success(result);
  } catch (e) {
    console.error('Add Line Items Lambda: Error Encountered: ', e);
    return HttpResponse.serverError(e);
  }
};

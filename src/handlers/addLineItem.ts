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
    console.log('Add Line Items Lambda: Incoming Event: ', JSON.stringify(event));

    const cartId = event.pathParameters.id;
    const cartLineItems = JSON.parse(event.body as string);

    console.log('Add Line Items Lambda: Cart Id: ', cartId);
    console.log('Add Line Items Lambda: Cart Line Items: ', cartLineItems);

    const result = await cartProvider.addLineItems(cartId, cartLineItems);

    console.log('Add Line Items Lambda: Cart Updated: ', result);

    return HttpResponse.success(result);
  } catch (e) {
    console.error('Add Line Items Lambda: Error Encountered: ', e);
    return HttpResponse.serverError(e);
  }
};

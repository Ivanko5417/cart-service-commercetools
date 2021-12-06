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
    console.log('Add Discount Code Lambda: Incoming Event: ', JSON.stringify(event));

    const cartId = event.pathParameters.id;
    const requestBody = JSON.parse(event.body as string);

    console.log('Add Discount Code Lambda: Cart Id: ', cartId);
    console.log('Add Discount Code Lambda: Discount Code: ', requestBody);

    const result = await cartProvider.addDiscountCode(cartId, requestBody.discountCode);

    console.log('Add Discount Code Lambda: Cart Updated: ', result);

    return HttpResponse.success(result);
  } catch (e) {
    console.error('Add Discount Code Lambda: Error Encountered: ', e);
    return HttpResponse.serverError(e);
  }
};

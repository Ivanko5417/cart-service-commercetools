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
    console.log('Set Payment Method Lambda: Incoming Event: ', JSON.stringify(event));

    const cartId = event.pathParameters.id;
    const paymentMethodDetails = JSON.parse(event.body as string);

    console.log('Set Payment Method Lambda: Cart Id: ', cartId);
    console.log('Set Payment Method Lambda: Payment: ', paymentMethodDetails);

    const result = await cartProvider.setPaymentMethod(cartId, paymentMethodDetails.paymentMethodId);

    console.log('Set Payment Method Lambda: Cart Updated: ', result);

    return HttpResponse.success(result);
  } catch (e) {
    console.error('Set Payment Method Lambda: Error Encountered: ', e);
    return HttpResponse.serverError(e);
  }
};

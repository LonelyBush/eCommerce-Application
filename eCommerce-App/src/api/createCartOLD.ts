//----------------------------------------------------------------------------------------
import {
  createApiBuilderFromCtpClient,
  LineItem as CommercetoolsLineItem,
} from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

import {
  projectKey,
  authMiddlewareOptions,
  httpMiddlewareOptions,
} from './constForApi';

interface Cart {
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  cartState: string;
  lineItems: CommercetoolsLineItem[];
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  shippingMode: string;
  origin: string;
}

interface CommercetoolsApiError {
  statusCode: number;
  message: string;
  body?: unknown;
}

function isCommercetoolsApiError(
  error: unknown,
): error is CommercetoolsApiError {
  return (error as CommercetoolsApiError).statusCode !== undefined;
}

const middleware = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

const apiRoot = createApiBuilderFromCtpClient(middleware).withProjectKey({
  projectKey,
});

export default async function getOrCreateCart(cartId: string): Promise<Cart> {
  try {
    const headResponse = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .head()
      .execute();

    if (headResponse.statusCode === 200) {
      const cartResponse = await apiRoot
        .carts()
        .withId({ ID: cartId })
        .get()
        .execute();

      const cart: Cart = {
        id: cartResponse.body.id,
        version: cartResponse.body.version,
        createdAt: cartResponse.body.createdAt,
        lastModifiedAt: cartResponse.body.lastModifiedAt,
        cartState: cartResponse.body.cartState,
        lineItems: cartResponse.body.lineItems,
        totalPrice: {
          type: cartResponse.body.totalPrice.type,
          currencyCode: cartResponse.body.totalPrice.currencyCode,
          centAmount: cartResponse.body.totalPrice.centAmount,
          fractionDigits: cartResponse.body.totalPrice.fractionDigits,
        },
        shippingMode: cartResponse.body.shippingMode,
        origin: cartResponse.body.origin,
      };

      console.log('Cart exists:', cart);
      return cart;
    }
  } catch (error) {
    if (isCommercetoolsApiError(error) && error.statusCode !== 404) {
      console.error('Error checking cart existence:', error);
      throw new Error(`Commercetools API error: ${error.message}`);
    } else if (isCommercetoolsApiError(error) && error.statusCode === 404) {
      console.log('Cart not found, creating a new one.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error(`Commercetools API error`);
    }
  }

  const cartDraft = {
    currency: 'EUR',
  };

  try {
    const createResponse = await apiRoot
      .carts()
      .post({ body: cartDraft })
      .execute();

    const newCart: Cart = {
      id: createResponse.body.id,
      version: createResponse.body.version,
      createdAt: createResponse.body.createdAt,
      lastModifiedAt: createResponse.body.lastModifiedAt,
      cartState: createResponse.body.cartState,
      lineItems: createResponse.body.lineItems,
      totalPrice: {
        type: createResponse.body.totalPrice.type,
        currencyCode: createResponse.body.totalPrice.currencyCode,
        centAmount: createResponse.body.totalPrice.centAmount,
        fractionDigits: createResponse.body.totalPrice.fractionDigits,
      },
      shippingMode: createResponse.body.shippingMode,
      origin: createResponse.body.origin,
    };

    console.log('Cart created:', newCart);
    console.log('Cart line:', createResponse.body.lineItems);
    return newCart;
  } catch (createError) {
    if (isCommercetoolsApiError(createError)) {
      console.error('Error creating cart:', createError);
    } else {
      console.error('Unexpected error:', createError);
    }
    throw createError;
  }
}
//----------------------------------------------------------------------------------------
// import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
// import { ClientBuilder } from '@commercetools/sdk-client-v2';
// import { ICart } from '../types/cart-interface/cart-interface';

// import {
//   projectKey,
//   authMiddlewareOptions,
//   httpMiddlewareOptions,
// } from './constForApi';

// interface CommercetoolsApiError {
//   statusCode: number;
//   message: string;
//   body?: unknown;
// }

// function isCommercetoolsApiError(error: unknown): error is CommercetoolsApiError {
//   return (error as CommercetoolsApiError).statusCode !== undefined;
// }

// const middleware = new ClientBuilder()
//   .withClientCredentialsFlow(authMiddlewareOptions)
//   .withHttpMiddleware(httpMiddlewareOptions)
//   .withLoggerMiddleware()
//   .build();

// console.log("Project Key:", projectKey);

// const apiRoot = createApiBuilderFromCtpClient(middleware).withProjectKey({ projectKey });

// export default async function getOrCreateCart(cartId: string): Promise<ICart> {
//   try {
//     const headResponse = await apiRoot
//       .carts()
//       .withId({ ID: cartId })
//       .head()
//       .execute();

//     if (headResponse.statusCode === 200) {
//       const cartResponse = await apiRoot
//         .carts()
//         .withId({ ID: cartId })
//         .get()
//         .execute();

//       const cart: ICart = {
//         id: cartResponse.body.id,
//         version: cartResponse.body.version,
//         createdAt: cartResponse.body.createdAt,
//         lastModifiedAt: cartResponse.body.lastModifiedAt,
//         lineItems: cartResponse.body.lineItems,
//         cartState: cartResponse.body.cartState,
//         totalPrice: {
//           type: cartResponse.body.totalPrice.type,
//           currencyCode: cartResponse.body.totalPrice.currencyCode,
//           centAmount: cartResponse.body.totalPrice.centAmount,
//           fractionDigits: cartResponse.body.totalPrice.fractionDigits,
//         },
//         shippingMode: cartResponse.body.shippingMode,
//         origin: cartResponse.body.origin,
//       };

//       console.log('Cart exists:', cart);
//       return cart;
//     }
//   } catch (error) {
//     if (isCommercetoolsApiError(error) && error.statusCode !== 404) {
//       console.error('Error checking cart existence:', error);
//       throw error;
//     } else if (isCommercetoolsApiError(error) && error.statusCode === 404) {
//       console.log('Cart not found, creating a new one.');
//     } else {
//       console.error('Unexpected error:', error);
//       throw error;
//     }
//   }

//   const cartDraft = {
//     currency: 'EUR',
//   };

//   try {
//     const createResponse = await apiRoot
//       .carts()
//       .post({ body: cartDraft })
//       .execute();

//     const newCart: ICart = {
//       id: createResponse.body.id,
//       version: createResponse.body.version,
//       createdAt: createResponse.body.createdAt,
//       lastModifiedAt: createResponse.body.lastModifiedAt,
//       cartState: createResponse.body.cartState,
//       totalPrice: {
//         type: createResponse.body.totalPrice.type,
//         currencyCode: createResponse.body.totalPrice.currencyCode,
//         centAmount: createResponse.body.totalPrice.centAmount,
//         fractionDigits: createResponse.body.totalPrice.fractionDigits,
//       },
//       shippingMode: createResponse.body.shippingMode,
//       origin: createResponse.body.origin,
//     };

//     console.log('Cart created:', newCart);
//     return newCart;
//   } catch (createError) {
//     if (isCommercetoolsApiError(createError)) {
//       console.error('Error creating cart:', createError);
//     } else {
//       console.error('Unexpected error:', createError);
//     }
//     throw createError;
//   }
// }

import { apiHelper } from "../helper/apiHelper";

export const orderServices = {
    postorder,
    getAllOrder,
    getOrderbyId
}


function getAllOrder(getOrdersURL) {
    return apiHelper.get(getOrdersURL);
}

function postorder(addEditOrderURL, order, orderId = null, status = null) {
    const payload = {
        billingAddress: {
            name: order.billingAddress.name,
            email: order.billingAddress.email,
            address: order.billingAddress.address,
            phoneNumber: order.billingAddress.phoneNumber,
            country: order.billingAddress.country,
            zip: order.billingAddress.zip,
        },
        payment: {
            nameOnCard: order.payment.nameOnCard,
            cardNumber: order.payment.cardNumber,
            expiration: order.payment.expiration,
            cvv: order.payment.cvv,
        },
        totalAmount: order.totalAmount,
        orderStatus: status || order.orderStatus,
        cart: order.cart,
        customerId: order.customerId,
    };

    if (orderId) {
        payload.orderId = orderId;
    }

    return apiHelper.post(addEditOrderURL, payload).then(order => {
        return order;
    });
}

function getOrderbyId( apiProductById, userId) {
    return apiHelper.get(`${apiProductById}${userId}`)
}
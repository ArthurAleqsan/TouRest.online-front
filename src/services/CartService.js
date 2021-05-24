import Request from './Request';

class CartService extends Request {
    constructor() {
        super('orders');
    }
    
    addOrder(data) {
        const options = {
            method: 'POST',
            body:JSON.stringify(data),
        };
        return this.send({path: `/`, options }).then(({ status, json }) => ({ status, json }));

    }
}

export default new CartService();
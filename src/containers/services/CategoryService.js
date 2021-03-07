import Request from './Request';

class CategoryService extends Request {
    constructor() {
        super('categories');
    }
    getCategories() {
        const options = {
            method: 'GET',
        };
        return this.send({path: `/`, options}).then(({ status, json }) => ({status, json}));
    }
}

export default new CategoryService();
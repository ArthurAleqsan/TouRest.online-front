import Request from './Request';

class ToursService extends Request {
    constructor() {
        super('tours');
    }

    getTours(query) {
        const options = {
            method: 'GET',
        };
        return this.send({ path: query ? `/?${Request.makeQuery(query)}` : '/', options }).then(({ status, json }) => ({ status, json }));
    }
    getTourById(id) {
        const options = {
            method: 'GET',
        };
        return this.send({path: `/${id}`, options }).then(({ status, json }) => ({ status, json }));
    }
}

export default new ToursService();
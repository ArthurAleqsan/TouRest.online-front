import Request from './Request';

class BlogService extends Request {
    constructor() {
        super('blogs');
    }
    getBlogs() {
        const options = {
            method: 'GET',
        };
        return this.send({ path: `/`, options }).then(({ status, json }) => ({ status, json }));
    }
    getSingleBlog(id) {
        const options = {
            method: 'GET',
        };
        return this.send({ path: `/${id}`, options }).then(({ status, json }) => ({ status, json }));
    }
}

export default new BlogService();
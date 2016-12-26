module.exports = {
    port: 3000,
    session: {
        secret: 'my-blog',
        key: 'my-blog',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/blog'
};
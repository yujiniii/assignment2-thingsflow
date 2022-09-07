const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const options = {
  info: {
    title: 'This is my API Document',
    description: '게시글 관리 api 서버',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  schemes: ['http'],
};
const outputFile = './swagger/swagger-output.json';
const endpointsFiles = ['./components/post/postRoute.js', './components/user/userRoute.js'];
swaggerAutogen(outputFile, endpointsFiles, options);

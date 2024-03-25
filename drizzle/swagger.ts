import swaggerJSDoc from 'swagger-jsdoc'
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
  title: 'Drizzle',
  version: '1.0.0',
  description: 'APIs for Drizzle',
  },
  };
  
  const options = {
  swaggerDefinition,
  apis: ['*.ts'], // Path to the API routes in your Node.js application
  };
  
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

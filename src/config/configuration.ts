export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: process.env.MONGO_URL,
});

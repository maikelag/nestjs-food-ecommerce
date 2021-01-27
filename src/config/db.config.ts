export const dbConfig = () => ({
  port: Number(process.env.PORT || 3000),
  jwtSecret: process.env.JWT_SECRET,
});

export const generalConfig = () => ({
  port: Number(process.env.PORT || 3000),
  jwtSecret: process.env.JWT_SECRET,
});

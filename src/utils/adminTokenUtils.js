import jwt from "jsonwebtoken";

export const generateAdminTokens = (admin) => {
  const accessToken = jwt.sign(
    {
      id: admin._id,
      regNumber: admin.regNumber,
      email: admin.email,
      role: "admin",
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    {
      id: admin._id,
      role: "admin",
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};
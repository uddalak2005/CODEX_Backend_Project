// Utility function for generating both access and refresh tokens
export const generateTokens = (user) => {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    
    return { accessToken, refreshToken };
};

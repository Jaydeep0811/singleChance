import Cookies from 'js-cookie';

const TokenManager = {
    // Cookie names
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
    TOKEN_EXPIRY: 'tokenExpiry',
  
    // Set authentication tokens
    setAuthTokens: (response) => {
      try {
        // Set access token with explicit expiry
        Cookies.set(TokenManager.ACCESS_TOKEN, response.accessToken, {
          secure: true,
          sameSite: 'Strict',
          path: '/'
        });
  
        // Set refresh token
        Cookies.set(TokenManager.REFRESH_TOKEN, response.refreshToken, {
          secure: true,
          sameSite: 'Strict',
          path: '/'
        });
  
        // Store expiry
        Cookies.set(TokenManager.TOKEN_EXPIRY, response.expiry, {
          secure: true,
          sameSite: 'Strict',
          path: '/'
        });
  
        // Verify tokens were set
        const accessToken = Cookies.get(TokenManager.ACCESS_TOKEN);
        const refreshToken = Cookies.get(TokenManager.REFRESH_TOKEN);
        
        if (!accessToken || !refreshToken) {
          console.error('Failed to set tokens');
          return false;
        }
        
        return true;
      } catch (error) {
        console.error('Error setting tokens:', error);
        return false;
      }
    },
  
    // Get tokens
    getAccessToken: () => Cookies.get(TokenManager.ACCESS_TOKEN),
    getRefreshToken: () => Cookies.get(TokenManager.REFRESH_TOKEN),
    getTokenExpiry: () => Cookies.get(TokenManager.TOKEN_EXPIRY),
  
    // Clear all auth tokens
    clearTokens: () => {
      Cookies.remove(TokenManager.ACCESS_TOKEN, { path: '/' });
      Cookies.remove(TokenManager.REFRESH_TOKEN, { path: '/' });
      Cookies.remove(TokenManager.TOKEN_EXPIRY, { path: '/' });
    },
  
    // Check if user is authenticated
    isAuthenticated: () => {
      const accessToken = TokenManager.getAccessToken();
      const expiry = TokenManager.getTokenExpiry();
      
      if (!accessToken || !expiry) return false;
      
      return new Date(expiry) > new Date();
    }
  };

export default TokenManager;
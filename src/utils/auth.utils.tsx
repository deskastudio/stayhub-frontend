export const getTokenPayload = () => {
  try {
    // Get token from sessionStorage
    const token = sessionStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    // Decode payload
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));

    return payload;
  } catch (error) {
    console.error('Failed to get token payload:', error);
    return null;
  }
};

// get user role
export const getUserRole = () => {
  const payload = getTokenPayload();
  return payload ? payload.role : null;
};

// get user id
export const getUserId = () => {
  const payload = getTokenPayload();
  return payload ? payload.id : null;
};

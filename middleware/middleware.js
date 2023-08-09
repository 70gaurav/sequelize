import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');// Get the token  from the request header

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, 'secret_key'); 

    req.user = decoded; // Store the decoded user data in the request object
    next(); // Move on to the next middleware or route handler
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(403).json({ error: 'Access denied. Invalid token.' });
  }
};

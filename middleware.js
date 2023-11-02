const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, '123456789');
    req.user = decoded; // Store the decoded user data in req.user

    // Fetch the user's role from the database and add it to req.user
    User.findById(decoded._id, 'role', (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching user data.' });
      }
      req.user.role = user.role; // Add the user's role to req.user
      next();
    });
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
}


function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
  
  function isLibrarian(req, res, next) {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'librarian')) {
      return next();
    }
    return res.status(403).json({ message: 'Access denied. Librarian or admin privileges required.' });
  }
  
  function isMember(req, res, next) {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'librarian' || req.user.role === 'member')) {
      return next();
    }
    return res.status(403).json({ message: 'Access denied. Member, librarian, or admin privileges required.' });
  }

  

module.exports = {verifyToken,isAdmin,isLibrarian,isMember};

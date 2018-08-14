
// const jwt = require('jsonwebtoken');
// const secretKey = 'secret';
// /*
//  Modularize DB Connection
// */

// module.exports = {
//     // Issue jwt Token
//     sign : function(email, user_idx) {
//         const options = {
//             algorithm : "HS256",
//             expiresIn : 60 * 60 * 24 * 30 //30 days
//         };
//         const payload = {
//             "email" : email,
//             "user_idx" : user_idx
//         };
        
//         let token = jwt.sign(payload, secretKey, options);
//         return token;
//     },
//     // Check jwt
//     verify : function(token) {
//         let decoded;
//         try {
//             decoded = jwt.verify(token, secretKey);
//             if(!decoded) {
//                 return -1;
//             }else {
//                 return decoded;
//             }
//         }
//         catch(err) {
//             if(err.message === 'jwt expired') console.log('expired token');
//             else if(err.message === 'invalid token') console.log('invalid token');
//         }
//     }
// };

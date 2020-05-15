const MONGOURL =
  'mongodb+srv://admin:admin123@bhainichaal-tutym.mongodb.net/protrasys?retryWrites=true&w=majority';
const JWTSECRET = 'badboysecurities';

// ===================== Exporting Credentials =========================
export const databaseString = MONGOURL;
export const jwtSecret = JWTSECRET;
export const port = process.env.PORT || 5000;

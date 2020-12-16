import rateLimit from 'express-rate-limit';
import RateLimitStore from 'rate-limit-mongo';


export default rateLimit({
  max: 300,
  message: JSON.stringify({ code: 429, message: 'Você está tendo uma taxa limitada.' }),
  store: new RateLimitStore({ uri:  process.env.MONGO_URI }),
  windowMs: 60 * 1000
});

//  Script Developed By :
// Fiverr Profile Url - https://www.fiverr.com/honey_devv
// Telegram Username - @ronnekeren | https://t.me/Sunnygur
// Email Id - jaskaurhello@gmail.com | youtoobtv18@gmail.com

import * as dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';

//{ path: resolve(cwd(), '.env') }
dotenv.config();

export default cleanEnv(process.env, {
  phoneNumber: num(),
  sessionString: str(),
  apiId: num(),
  apiHash: str(),

  admins: str(),

  groupUsername: str(),
});

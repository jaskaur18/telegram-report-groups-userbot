import { TelegramClient, errors, Logger } from 'telegram';
import { LogLevel } from 'telegram/extensions/Logger';
import { StringSession } from 'telegram/sessions';
import env from './env';
//  Script Developed By :
// Fiverr Profile Url - https://www.fiverr.com/honey_devv
// Telegram Username - @ronnekeren | https://t.me/Sunnygur
// Email Id - jaskaurhello@gmail.com | youtoobtv18@gmail.comimport getProxy from './proxy';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const input = require('input'); // npm i input

export default async function loginAccount(
  _index: number,
  phoneNumber: string,
  sessionString: string,
  ip: string,
  port: number,
  username: string,
  password: string,
): Promise<TelegramClient | false> {
  try {
    const stringSession = new StringSession(sessionString);

    //create new TelegramClient
    const client = new TelegramClient(stringSession, env.apiId, env.apiHash, {
      // proxy: {
      //   socksType: 5,
      //   username,
      //   password,
      //   ip,
      //   port,
      // },
      requestRetries: 1,
      baseLogger: new Logger(LogLevel.ERROR),
    });

    await client.connect();
    if (await client.isUserAuthorized()) return client;

    //Login The account
    await client.start({
      phoneNumber,
      password: async () =>
        await input.text(`Enter Password for ${phoneNumber} -`),
      phoneCode: async () => await input.text('Enter Phone Code -'),
      onError: err => {
        if (err.message === 'PHONE_NUMBER_INVALID')
          return console.log(`Phone Number is Invalid -${phoneNumber}`);
        else console.log(err);
      },
    });
    return client;
  } catch (err) {
    if (err instanceof errors.AuthKeyError) {
      if (err?.code === 400)
        console.log(`Invalid Phone Number - ${phoneNumber}`);
    }
    //else console.log(err);
    return false;
  }
}

import { accountList, message } from '../helpers/constant';
import fs from 'fs';
import phoneJson from '../sessions.json';
import { Api, errors } from 'telegram';
import loginAccount from '../helpers/loginAccount';
import env from '../helpers/env';
import getProxy from '../helpers/proxy';

export default async function reportChat() {
  try {
    //check if sessions.json exits
    if (!fs.existsSync('./src/sessions.json'))
      return console.log('sessions.json not found');

    //read array of number from phonenumber.json
    if (phoneJson.length === 0)
      return console.log("sessions.json didn't have phone number");

    //create list object phoneNumber and sessionString from array of csv coloumn

    phoneJson.map((row, index) => {
      accountList.push(row);
    });

    //get message from message.txt

    //loop through accountList for loop
    for (let i = 0; i < accountList.length; i++) {
      let phone = accountList[i];
      let {
        // eslint-disable-next-line prefer-const
        index,
        // eslint-disable-next-line prefer-const
        phoneNumber,
        // eslint-disable-next-line prefer-const
        sessionString,
        // eslint-disable-next-line prefer-const
        proxy,
        ip,
        port,
        username,
        password,
      } = phone;

      // if (!proxy) {
      //   //set proxy
      //   const _proxy = await getProxy();
      //   //set ip and port
      //   ip = _proxy.ip;
      //   port = +_proxy.port;
      //   //set username and password
      //   username = _proxy.username;
      //   password = _proxy.password;

      //   phone = {
      //     index,
      //     phoneNumber,
      //     sessionString,
      //     proxy: true,
      //     username,
      //     password,
      //     ip,
      //     port,
      //   };
      //   //update accountList to sessions.json
      //   fs.writeFileSync(
      //     './src/sessions.json',
      //     JSON.stringify(accountList, null, 2),
      //   );
      // }

      console.log(`Login Account ${index} Phone Number ${phoneNumber}`);

      let client = await loginAccount(
        index,
        phoneNumber,
        sessionString,
        ip,
        port,
        username,
        password,
      );

      if (!client) {
        //remove object from accountList
        accountList.splice(index, 1);
        continue;
      }
      console.log(`${phoneNumber} authorized`);

      const result = await client.invoke(
        new Api.account.ReportPeer({
          peer: env.groupUsername,
          reason: new Api.InputReportReasonFake(),
          message: `${message}`,
        }),
      );

      if (!result) {
        console.log(`${env.groupUsername} not reported By ${phoneNumber}`);
        continue;
      }

      await client.sendMessage('@notoscam', { message: message });
      await client.disconnect();
      client = false;
      console.log('reported by', phoneNumber);
      continue;
    }
  } catch (err) {
    if (err instanceof errors.AuthKeyError) {
      console.log(`Not able to report chat ${err?.code}`);
    }
    // console.log(error);
  }
  console.log(`${env.groupUsername} reported From All Accounts`);
}

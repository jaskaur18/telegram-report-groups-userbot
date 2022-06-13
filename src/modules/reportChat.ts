import { accountList, message } from '../helpers/constant';
import fs from 'fs';
import phoneJson from '../sessions.json';
import { Api, errors } from 'telegram';
import loginAccount from '../helpers/loginAccount';
import env from '../helpers/env';

export default function reportChat() {
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

    accountList.map(async (phone, index) => {
      const { phoneNumber, sessionString } = phone;

      let client = await loginAccount(index, phoneNumber, sessionString);

      if (!client) return console.log(`${phoneNumber} not authorized`);

      console.log(`${phoneNumber} authorized`);

      const result = await client.invoke(
        new Api.account.ReportPeer({
          peer: env.groupUsername,
          reason: new Api.InputReportReasonFake(),
          message: `${message}`,
        }),
      );
      if (!result)
        return console.log(
          `${env.groupUsername} not reported By ${phoneNumber}`,
        );

      await client.sendMessage('@notoscam', { message: message });
      client.disconnect();
      client = false;
      return console.log('reported by', phoneNumber);
    });
  } catch (err) {
    if (err instanceof errors.AuthKeyError) {
      console.log(`Not able to report chat ${err?.code}`);
    }
    // console.log(error);
  }
  console.log(`${env.groupUsername} reported From All Accounts`);
}

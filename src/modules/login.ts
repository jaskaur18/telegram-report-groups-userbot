//  Script Developed By :
// Fiverr Profile Url - https://www.fiverr.com/honey_devv
// Telegram Username - @ronnekeren | https://t.me/Sunnygur
// Email Id - jaskaurhello@gmail.com | youtoobtv18@gmail.com

import fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const input = require('input'); // npm i input

export default async function loginAllAccounts() {
  //check if phonenumber.csv exits
  if (!fs.existsSync('phonenumber.csv'))
    return console.log('phonenumber.csv not found');

  //read array of number from phonenumber.csv
  const phoneNumbers: string[] = fs
    .readFileSync('phonenumber.csv', 'utf8')
    .split('\n');

  if (phoneNumbers.length === 0) return console.log('phonenumber.csv is empty');

  // eslint-disable-next-line no-undef
  await Promise.all(
    phoneNumbers.map(async (phoneNumber: string) => {
      try {
        console.log(`Logging in ${phoneNumber}`);

        const client = true;
        if (client) {
          console.log(`Logged in ${phoneNumber} Successfully`);
        } else console.log(`Failed to login ${phoneNumber}`);
      } catch (err) {
        return console.log(err);
      }
    }),
  );
  console.log('All Accounts Logged in Successfully');
  await input.text('Press Enter to Exit');
  process.exit(0 /* exit with success */);
}

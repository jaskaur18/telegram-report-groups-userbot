import loginAllAccounts from './modules/login';
import reportChat from './modules/reportChat';

const input = require('input'); // npm i input

(async () => {
  console.warn(`
  Script Developed By :
  
  Fiverr Profile Url - https://www.fiverr.com/honey_devv
  Telegram Username - @ronnekeren | https://t.me/Sunnygur
  Email Id - jaskaurhello@gmail.com | youtoobtv18@gmail.com
    `);

  ////////////////////////////////////////////////////////////////////////////////

  const options = ['Login All Accounts', 'Start Reporting Chat', 'Exit'];

  const answer = await input.select('What You Want To Do?', options);

  if (answer === 'Login All Accounts') return loginAllAccounts();

  if (answer === 'Start Reporting Chat') return reportChat();

  if (answer === 'Exit') {
    console.log('Bye Bye');
    process.exit(0);
  }
})();

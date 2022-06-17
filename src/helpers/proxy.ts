//  Script Developed By :
// Fiverr Profile Url - https://www.fiverr.com/honey_devv
// Telegram Username - @ronnekeren | https://t.me/Sunnygur
// Email Id - jaskaurhello@gmail.com | youtoobtv18@gmail.com

import fs from 'fs';
import axios from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';

async function CheckProxyWorking(
  username: string,
  password: string,
  ip: string,
  port: string,
) {
  const proxyOptions = {
    hostname: ip,
    port: +port,
    username,
    password,
  };

  const httpsAgent = new SocksProxyAgent(proxyOptions);

  //check if proxy is working or not via axios
  const client = axios.create({
    baseURL: 'https://ipinfo.io',
    httpsAgent,
  });

  const ProxyWorked = await client.get('/').catch(err => undefined);
  if (!ProxyWorked) return false;
  if (ProxyWorked.status !== 200) false;
  return true;
}

//function to get the proxy from proxy.csv and return random proxy
export default async function getProxy(): Promise<{
  username: string;
  password: string;
  ip: string;
  port: string;
}> {
  const csvData = fs.readFileSync('proxy.csv', 'utf8').split('\n');
  const randomProxy = csvData[Math.floor(Math.random() * csvData.length)];
  const [username, password, ip, port] = randomProxy
    .replace(':', ',')
    .replace('@', ',')
    .split(',');

  const proxyWorking = await CheckProxyWorking(username, password, ip, port);

  //if proxy is not working then remove it from the csv file and get new proxy
  if (!proxyWorking) {
    console.log(`Proxy - ${ip}:${port} Didn't Work Trying Again`);

    // const newCsvDdata = csvData.filter(proxy => proxy !== randomProxy);
    // fs.writeFileSync('proxy.csv', newCsvData.join('\n'));
    return getProxy();
  }

  return { username, password, ip, port };
}

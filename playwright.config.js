// @ts-check
import { defineConfig, devices, webkit } from '@playwright/test';
import { TIMEOUT } from 'node:dns';


const config = ({
  testDir: './tests',
  
  timeout: 30*1000,
  expect: {timeout: 5000,},
  retries: 1,
  reporter: 'html',
  use: {
  browserName: 'chromium',
  headless: false,
  screenshot: 'only-on-failure',
  },
 

});
module.exports= config  

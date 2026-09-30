const { test, expect } = require('@playwright/test');
const { text } = require('node:stream/consumers');
const {Event} = require('../pageobjects/Event');

test('Assignment02_Test01', async ({ page }) => {
    
    const event = new Event(page);
   
    const user = "ashok@yopmail.com";
    const password = "Test@123";
    const cusName = "Test User";
    const cusMail = "test@yopmail.com";
    const cusNum = "9876543210";
  
    await event.goTo();
    await event.ValidLogin(user,password);
    await event.bookTicket(cusName,cusMail,cusNum);
    await event.ValidateRefID();
    await event.CheckRefundEligibility();
    
})

test('Assignment02_Test02', async ({ page }) => {
    
    const event = new Event(page);
    
    const user = "test@yopmail.com";
    const password = "Test@123";
    const cusName = "Test User";
    const cusMail = "test@yopmail.com";
    const cusNum = "9876543210";

    await event.goTo();
    await event.ValidLogin(user,password);
    await event.book3Tickets(cusName,cusMail,cusNum);
    await event.ValidateRefID();
    await event.CheckRefundEligibility();
    
})
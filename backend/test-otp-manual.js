// Manual testing guide for OTP verification feature

/**
 * OTP Verification Testing Guide
 * =============================
 * 
 * This document provides steps to manually test the OTP verification feature
 * in the frontend application.
 * 
 * Prerequisites:
 * - Both backend and frontend servers are running
 * - Backend: node src/server.js
 * - Frontend: npm run dev
 * 
 * Test Scenarios:
 * ---------------
 * 
 * 1. Happy Path: Complete Registration with Valid OTP
 *    a. Navigate to /customer/register or click "Create Account" from the homepage
 *    b. Fill in all required registration details
 *    c. Click "Continue to Verification"
 *    d. Check database for the OTP (use query: SELECT * FROM registration_otp WHERE email = '<your-email>')
 *    e. Enter the correct OTP in the verification form
 *    f. Click "Verify & Create Account"
 *    g. Verify you're redirected to the customer dashboard
 *    h. Check that account was created in the database
 * 
 * 2. Invalid OTP
 *    a. Follow steps 1.a through 1.c above
 *    b. Enter an incorrect OTP
 *    c. Click "Verify & Create Account"
 *    d. Verify that an error message appears
 *    e. Verify the attempt counter increased in the database
 * 
 * 3. Resend OTP
 *    a. Follow steps 1.a through 1.c above
 *    b. Click the "Resend OTP" button
 *    c. Check database for the new OTP
 *    d. Verify the old OTP no longer works
 *    e. Enter the new OTP and verify it works
 * 
 * 4. Expired OTP
 *    a. Follow steps 1.a through 1.c above
 *    b. Wait for 15+ minutes (or manually update the expiry time in the database)
 *    c. Try to verify with the OTP
 *    d. Verify that an expiration error message appears
 * 
 * 5. Too Many Failed Attempts
 *    a. Follow steps 1.a through 1.c above
 *    b. Deliberately enter wrong OTP 5 times
 *    c. On the 6th attempt, verify that a "too many attempts" error message appears
 * 
 * 6. Browser Refresh During Verification
 *    a. Follow steps 1.a through 1.c above
 *    b. Refresh the browser while on the OTP verification page
 *    c. Check if the user is correctly redirected back to the registration page
 *    d. Verify that OTP can still be sent and verified after refresh
 * 
 * Database queries for testing:
 * ----------------------------
 * 
 * - Check OTP and expiry: 
 *   SELECT email, otp, expires_at, attempted_count FROM registration_otp WHERE email = '<email>';
 * 
 * - Reset OTP attempts:
 *   UPDATE registration_otp SET attempted_count = 0 WHERE email = '<email>';
 * 
 * - Manually expire OTP:
 *   UPDATE registration_otp SET expires_at = NOW() - INTERVAL '20 minutes' WHERE email = '<email>';
 * 
 * - Delete test accounts:
 *   DELETE FROM customers WHERE email = '<email>';
 *   DELETE FROM registration_otp WHERE email = '<email>';
 */

console.log('Manual OTP Testing Guide');
console.log('Please open this file to view the testing instructions');
console.log('Location: test-otp-manual.js');

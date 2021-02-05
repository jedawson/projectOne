# Tuition Reimbursement Management System

This management system allows users to request tuition reimbursements.

To run this code, you must have Node JS installed on your system and have aws configured on your system.


1. Set up the front end by navigating to the projectOneExpress folder and installing node modules by `npm install`
2. Create the tables in Dynamo DB my running <br>
<pre>
npm run setup 
npm run setupR 
npm run populateR 
npm run populateU 
npm run populateR007 
</pre>
1. create `.env` file from example
2. then run command `npm run start `

In another terminal window, navigate to projectonereact and do the following:
1. `npm install`
2. create `.env` file from example
3. `npm run start`
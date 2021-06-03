# Aspire Loan APP

## 📬 Node Version:
v14.12.0

## 📬 Steps to Run the app:
1. use "npm i" (to install all the dependencies).
2. "npm run serve" to start the dev server.

## Project Details

### Roles 
Customer , Admin

### How to access admin console
As of now, authentication is only handled for the constomer and
to access Admin panel please use '/admin-dashboard' 

### Admin Panel Details
1. List all the requested and inactive loans (for approval) 
2. List user basic details eg: Name, Phone Number, Requested Amount & Tenure
3. Admin can Approve the requested loans.
4. Once approved, customers can see the details in the dashboard (after authetication)

### Landing Page
End Users can register (if not having an account) or Login (Existing User)
Once the end user is authenticated we redirect them to '/dashboard' page.

### Dashboard Page
1. Endusers can see all the approved loans 
2. Request for a loan
3. Pay for a certain loan

### Storing Date
As of now, i am using localStorage to store the data in the browser like account details, loan details.

### Code Details
1. All the services are defined under services directory for the better code maintainability and seperation of concerns.
Currently we have three services defined in the code
 - Admin APIs (admin.api.js)
 - Customer / Loans APIs (loans.api.js)
 - Login Register APIs (login-register.api.js)
2. Pages are under the views directory
3. Components are under components directory
4. For styling the entire ui, using the base setup of SCSS is same as CSS Challange
https://xd.adobe.com/view/80c753f2-db2f-4dfc-b6c2-ce39a4c787f0-d594/

#### Demo Link of CSS Challange:
https://aspire-app.vercel.app/

#### Github Link of CSS Challange:
https://github.com/iamsandeepkumarmandal/aspire-dashboard

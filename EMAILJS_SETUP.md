# EmailJS Setup Guide for Contact Form

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Click "Sign Up" (free account)
3. Verify your email

## Step 2: Add Email Service
1. Go to "Email Services" in the dashboard
2. Click "Add New Service"
3. Choose "Gmail" (or your preferred email provider)
4. Connect your Gmail account (yugbaid4@gmail.com)
5. Copy the **Service ID** (looks like: service_abc123)

## Step 3: Create Email Template
1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. **IMPORTANT: Set the recipient email first!**
   - In the template settings, find "To email" field
   - Enter: `yugbaid4@gmail.com` (or use `{{to_email}}` if you want it dynamic)
   - This tells EmailJS WHERE to send the emails

4. Use this template content:

**Subject:**
```
New Contact Form Submission - {{subject}}
```

**Body:**
```
You have a new message from your portfolio contact form!

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Reply to this email to respond directly to the sender.
```

5. **Set Reply-To field** (optional but recommended):
   - In template settings, set "Reply to" as: `{{from_email}}`
   - This allows you to reply directly to the sender

6. Save the template
7. Copy the **Template ID** (looks like: template_xyz789)

## Step 4: Get Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (looks like: abcDEF123xyz)

## Step 5: Update Your Code
Open `src/Sections/Contact.jsx` and replace these values (around line 80):

```javascript
const serviceId = 'YOUR_SERVICE_ID';    // Replace with your Service ID
const templateId = 'YOUR_TEMPLATE_ID';  // Replace with your Template ID
const publicKey = 'YOUR_PUBLIC_KEY';    // Replace with your Public Key
```

## Step 6: Test
1. Fill out your contact form
2. Click "Send Message"
3. Check your email inbox (yugbaid4@gmail.com)
4. You should receive an email with the form data!

## Important Notes:
- Free tier: 200 emails/month
- Emails arrive within seconds
- You can reply directly to the sender's email
- All form data is sent securely

## Troubleshooting:
- If emails don't arrive, check your spam folder
- Make sure all IDs are copied correctly (no extra spaces)
- Check browser console for error messages
- Verify your email service is connected in EmailJS dashboard

## Template Variables Used:
- `{{from_name}}` - User's name
- `{{from_email}}` - User's email
- `{{subject}}` - Form subject
- `{{message}}` - User's message
- `{{to_email}}` - Your email (yugbaid4@gmail.com)

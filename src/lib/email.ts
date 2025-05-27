// Mock email service for development
// In a real application, this would use a proper email service like SendGrid, AWS SES, etc.

export interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; message: string }> {
  // In development mode, just log the email
  if (process.env.NODE_ENV === 'development') {
    console.log('==================');
    console.log('EMAIL SENT:');
    console.log('To:', options.to);
    console.log('Subject:', options.subject);
    console.log('Body:', options.html || options.text);
    console.log('==================');
    
    return { success: true, message: 'Email sent (development mode)' };
  }
  
  try {
    // In production, you would use a real email service
    // Example with SendGrid:
    // await sendgrid.send({
    //   to: options.to,
    //   from: 'support@hellotrader.com',
    //   subject: options.subject,
    //   html: options.html,
    //   text: options.text
    // });
    
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email' };
  }
}

export function sendPasswordResetEmail(email: string, resetToken: string): Promise<{ success: boolean; message: string }> {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
  
  const emailOptions: EmailOptions = {
    to: email,
    subject: 'Password Reset Request',
    html: `
      <h1>Hello Trader - Password Reset</h1>
      <p>You requested a password reset. Please click the link below to reset your password:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
      <p>The link will expire in 1 hour.</p>
    `,
    text: `You requested a password reset. Please go to this link to reset your password: ${resetUrl}`
  };
  
  return sendEmail(emailOptions);
}

export function sendTransactionPasswordResetEmail(email: string, resetToken: string): Promise<{ success: boolean; message: string }> {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-transaction-password?token=${resetToken}`;
  
  const emailOptions: EmailOptions = {
    to: email,
    subject: 'Transaction Password Reset Request',
    html: `
      <h1>Hello Trader - Transaction Password Reset</h1>
      <p>You requested a transaction password reset. Please click the link below to reset your transaction password:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">Reset Transaction Password</a>
      <p>If you didn't request this, please ignore this email.</p>
      <p>The link will expire in 1 hour.</p>
    `,
    text: `You requested a transaction password reset. Please go to this link to reset your transaction password: ${resetUrl}`
  };
  
  return sendEmail(emailOptions);
}

export function sendWelcomeEmail(email: string, username: string): Promise<{ success: boolean; message: string }> {
  const emailOptions: EmailOptions = {
    to: email,
    subject: 'Welcome to Hello Trader!',
    html: `
      <h1>Welcome to Hello Trader, ${username}!</h1>
      <p>Thank you for joining our platform. We're excited to have you on board!</p>
      <p>Here are some quick links to get you started:</p>
      <ul>
        <li><a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard">Dashboard</a></li>
        <li><a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/profile">Your Profile</a></li>
        <li><a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/help">Help Center</a></li>
      </ul>
      <p>If you have any questions, feel free to contact our support team.</p>
    `,
    text: `Welcome to Hello Trader, ${username}! Thank you for joining our platform. We're excited to have you on board!`
  };
  
  return sendEmail(emailOptions);
} 
// Resend email client
export const resend = {
  emails: {
    send: async (data: Record<string, unknown>) => {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify(data),
      });
      return response.json();
    }
  }
};

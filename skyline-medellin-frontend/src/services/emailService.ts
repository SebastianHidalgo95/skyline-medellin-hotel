import emailjs from 'emailjs-com';

export const sendEmailService = (emailContent: Record<string, string>) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? 'service_kqdrmtt'
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'template_kbvglas';
  const userId = import.meta.env.VITE_EMAILJS_USER_ID ?? 'LVYu7NAaak0XhIxF4';
  console.log(
    'serviceId', serviceId
  )
  if (!serviceId || !templateId || !userId) {
    console.error('EmailJS environment variables are missing.');
    return;
  }

  emailjs
    .send(serviceId, templateId, emailContent, userId)
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
    });
};

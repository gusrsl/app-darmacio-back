// controller/emailController.js

const { sendEmail, generateAdminEmailHtml, generateCustomerEmailHtml } = require('../service/sendmail');

const sendOrderEmails = (req, res) => {
    const { customerEmail, orderDetails } = req.body;
  
    if (!customerEmail || !orderDetails) {
        console.log('Faltan datos requeridos para enviar el correo');
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }
  
    //Responder inmediatamente al cliente
    // res.status(202).json({ message: 'Proceso de envío de correos iniciado' });

    // Procesar el envío de correos de manera asíncrona
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminSubject = 'Nueva Orden Recibida';
    const adminHtmlContent = generateAdminEmailHtml(orderDetails);
  
    console.log('Intentando enviar correo al administrador:', adminEmail);
    sendEmail(adminEmail, adminSubject, adminHtmlContent)
        .then(() => {
            console.log('Correo enviado al administrador:', adminEmail);
        })
        .catch((error) => {
            console.error('Error al enviar correo al administrador:', error);
        });
  
    const customerSubject = 'Confirmación de su Pedido';
    const customerHtmlContent = generateCustomerEmailHtml(orderDetails);
  
    console.log('Intentando enviar correo al cliente:', customerEmail);
    sendEmail(customerEmail, customerSubject, customerHtmlContent)
        .then(() => {
            console.log('Correo enviado al cliente:', customerEmail);
        })
        .catch((error) => {
            console.error('Error al enviar correo al cliente:', error);
        });
};
  
module.exports = {
  sendOrderEmails,
};
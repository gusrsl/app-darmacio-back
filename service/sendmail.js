const nodemailer = require('nodemailer');

// Configurar el transportador de correo
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true', // true para 465, false para otros puertos
  auth: {
    user: process.env.SMTP_USER, // Tu usuario del servidor SMTP
    pass: process.env.SMTP_PASS, // Tu contraseña del servidor SMTP
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

// Mejora de las funciones generateAdminEmailHtml y generateCustomerEmailHtml para manejar múltiples productos

// Función para generar el contenido HTML del correo para el administrador
const generateAdminEmailHtml = (orderDetails) => {
  // Generar filas de productos
  const productRows = orderDetails.products.map(product => `
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">${product.name}</td>
      <td style="border: 1px solid #ddd; padding: 8px;">${product.quantity}</td>
      <td style="border: 1px solid #ddd; padding: 8px;">${product.price}</td>
    </tr>
  `).join('');

  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="text-align: center; color: #333;">Nueva Orden Recibida</h2>
      <p>Se ha recibido una nueva orden con los siguientes detalles:</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #e9e9e9;">Orden ID</th>
          <td style="border: 1px solid #ddd; padding: 8px;">${orderDetails.orderId}</td>
        </tr>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #e9e9e9;">Nombre del Cliente</th>
          <td style="border: 1px solid #ddd; padding: 8px;">${orderDetails.customerName}</td>
        </tr>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #e9e9e9;">Dirección</th>
          <td style="border: 1px solid #ddd; padding: 8px;">${orderDetails.address}</td>
        </tr>
        <tr>
          <th colspan="3" style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #e9e9e9;">Productos</th>
        </tr>
        ${productRows}
      </table>
    </div>
  `;
};

// Función para generar el contenido HTML del correo para el cliente
const generateCustomerEmailHtml = (orderDetails) => {
  // Generar filas de productos
  const productRows = orderDetails.products.map(product => `
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">${product.name}</td>
      <td style="border: 1px solid #ddd; padding: 8px;">${product.quantity}</td>
      <td style="border: 1px solid #ddd; padding: 8px;">${product.price}</td>
    </tr>
  `).join('');

  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="text-align: center; color: #333;">Confirmación de Pedido</h2>
      <p>Gracias por su compra. Aquí están los detalles de su pedido:</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #e9e9e9;">Orden ID</th>
          <td style="border: 1px solid #ddd; padding: 8px;">${orderDetails.orderId}</td>
        </tr>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #e9e9e9;">Nombre del Cliente</th>
          <td style="border: 1px solid #ddd; padding: 8px;">${orderDetails.customerName}</td>
        </tr>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #e9e9e9;">Dirección</th>
          <td style="border: 1px solid #ddd; padding: 8px;">${orderDetails.address}</td>
        </tr>
        <tr>
          <th colspan="3" style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #e9e9e9;">Productos</th>
        </tr>
        ${productRows}
      </table>
      <p style="text-align: center;">Gracias por comprar con nosotros.</p>
      <p style="text-align: center; margin-top: 20px;">Darmacio Shop</p>
    </div>
  `;
};
// Función para enviar correos
const sendEmail = (to, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.NO_REPLY_USER, // Dirección de correo desde la cual se envía el correo
    to,
    subject,
    html: htmlContent,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendEmail,
  generateAdminEmailHtml,
  generateCustomerEmailHtml,
};

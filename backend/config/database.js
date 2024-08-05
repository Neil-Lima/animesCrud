const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI não está definido nas variáveis de ambientes');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado com sucesso');
  } catch (error) {
    console.error('Erro de conexão com MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default: 0 },
  income: { type: Number, default: 0 },
  expense: { type: Number, default: 0 }, 
  loanBalance: { type: Number, default: 0 },
  paidLoan: { type: Number, default: 0 },
});

module.exports = mongoose.model('Wallet', walletSchema);

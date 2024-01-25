const Wallet = require('./walletModel');
const User = require('./userModel');

exports.addIncome = async (req, res) => {
  try {
    const userId = req.params.userId;
    const income = req.body.income; 
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    let wallet = await Wallet.findOne({ userId: userId });

    if (!wallet) {
      wallet = new Wallet({ userId: userId, income: income, balance:income });
    } else {
      wallet.income += income;
      wallet.balance+=income;
    }

    await wallet.save();

    res.status(200).json({
      message: 'Income Added Successfully!',
      User_Name: user.name,
      walletBalance: wallet.balance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error',error });
  }
};

exports.addExpense=async(req,res)=>{
    try {
        const userId=req.params.userId;
        const money=parseFloat(req.body.money);
        const user=await User.findById(userId);
        const wallet=await Wallet.findOne({userId:userId});
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
          }
        if(!wallet){
            return res.status(404).json({message:`${user.name} has don't have Wallet! Add His Income First!`})
        }
        if(wallet.balance<money){
            return res.status(409).json({message:'Insufficient Balance to add Expense',Available_balance: wallet.balance});
        }
        wallet.expense+=money;
        wallet.balance-=money;
        await wallet.save();
        res.status(200).json({message:`Expense Added Successfully for ${user.name}`,Available_balance: wallet.balance, Total_Expense: wallet.expense});
    } catch (error) {
        res.status(500).json({message:"Unable to Add Expense",error})
    }
}

exports.addLoan=async(req,res)=>{
    try {
        const userId=req.params.userId;
        const money=parseFloat(req.body.money);
        const user=await User.findById(userId);
        const wallet=await Wallet.findOne({userId:userId});
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
          }
        if(!wallet){
            return res.status(404).json({message:`${user.name} has don't have Wallet! Add His Income First!`})
        }
        wallet.loanBalance+=money;
        wallet.balance+=money;
        
        await wallet.save();

        res.status(200).json({message:`Loan Amount Added for ${user.name}`,wallet})

    } catch (error) {
        res.status(500).json({message:'Unable to add Loan Amount!',error});
    }
}

exports.payLoan=async(req,res)=>{
    try {
        const userId=req.params.userId;
        const money=parseFloat(req.body.money);
        const user=await User.findById(userId);
        const wallet=await Wallet.findOne({userId:userId});
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
          }
        if(!wallet){
            return res.status(404).json({message:`${user.name} has don't have Wallet! Add His Income First!`})
        }
        if(wallet.loanBalance<money){
            return res.status(410).json({message:`Invalid Amount Entered..! Pending Balance is ${wallet.loanBalance} for ${user.name}`});
        }
        if(wallet.balance<money){
            return res.status(409).json({message:`Insufficient Balance to Pay Loan for ${user.name}`,Available_balance: wallet.balance});
        }
        wallet.balance-=money;
        wallet.loanBalance-=money;
        wallet.paidLoan+=money;
        await wallet.save();
        res.status(200).json({message:`Loan amount Rs.${money} Paid for ${user.name}. Pending Loan Balance Rs.${wallet.loanBalance}`});
    } catch (error) {
        res.status(500).json({message:'Unable to Pay Loan Amount!',error});
    }
}

exports.getBalance=async(req,res)=>{
    try {
        const userId=req.params.userId;
        const user=await User.findById(userId);
        const wallet=await Wallet.findOne({userId:userId});
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
          }
        if(!wallet){
            return res.status(404).json({message:`${user.name} has don't have Wallet! Add His Income First!`})
        }
        res.status(200).json({message:`Available Balance for ${user.name}: Rs.${wallet.balance}`});

    } catch (error) {
        
    }
}
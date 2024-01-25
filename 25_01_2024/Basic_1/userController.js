const User=require('./userModel');

exports.createUser=async(req,res)=>{
    try {
        const {name,age,mobileNumber,address}=req.body;
        const existingUser=await User.findOne({mobileNumber});
        if(existingUser){
            return res.status(409).json({message: 'User Already Exist!'});
        }
        const user=new User({
            name,age,mobileNumber,address
        })
        await user.save();
        res.status(200).json({message:'User Saved Successfully!',user: user});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Something Went Wrong',error});
    }
}

exports.getUser=async(req,res)=>{
    try {
        const userId=req.params.userId;
        console.log(`User ID: ${userId}`);
        const user=await User.findById(userId);
        if(!user){
            return res.status(409).json({message:'User Not Found!'});
        }
        res.status(200).json({UserData:user});
    } catch (error) {
        res.status(500).json({message:'Unable to Get User Data',error})
    }
}

exports.getAllUsers=async(req,res)=>{
    try {
        const allUsers= await User.find();
    if(!allUsers){
        return res.status(409).json({message:'No Users Found!'})
    }
    res.status(200).json({User_DATA:allUsers});

    } catch (error) {
        res.status(500).json({message:'Unable to Get User Data',error});
    }
    
}

exports.updateUser = async (req, res) => {
    try {
      const { name, age, mobileNumber, address } = req.body;
      const userId = req.params.userId;
      
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { name, age, mobileNumber, address },
        { new: true, runValidators: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User Not Found!' });
      }
  
      res.status(200).json({ message: 'User Details Updated!', user });
    } catch (error) {
      res.status(500).json({ message: 'Unable to update user', error });
    }
  };
  
  exports.deleteUser= async(req,res)=>{
    try {
        const userId=req.params.userId;
        const user=await User.findOneAndDelete(userId);
        if(!user){
            return res.status(409).json({message:'User Not Found'});
        }
        res.status(200).json({message:'User Deleted Succssfully!',Deleted_User:user})

    } catch (error) {
        res.status(500).json({message:'Unable to Delete User!',error})
    }
  }
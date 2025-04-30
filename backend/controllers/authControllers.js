import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import usermodal from "../models/usermodal.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    //----- validation
    if ( !phone) {
      return res.status(400).send({
        success: false,
        message: "All fields are required (name, email, password, phone)",
      });
    }

    //----- Check if user already exists
    const existingUser = await usermodal.findOne({ email }); 

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered, please login",
      });
    }

    //------ Hash password
    const hashedPassword = await hashPassword(password);

    //-- Save new user
    const user = await new usermodal({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    }).save();

    // ---JWT token generate

    const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET,{expiresIn:'7d' },)

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(`registerController error:`, error); 
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error: error.message, 
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      res.status(400).send({
        success: false,
        message: "invalid email and password",
      });
    }

    const user = await usermodal.findOne({ email });
    
    if (!user) {
      res.status(404).send({
        success: false,
        message: `email is not registered`,
      });
    }
  

    //---- compare password
    const match = await comparePassword(password, user.password)
    if (!match) {
      res.status(200).send({
        success:false,
        message: 'invalid Password'
      })
      
    }
    
    //------ token

    const token = await JWT.sign({_id: user._id }, process.env.JWT_SECRET, {
      expiresIn :'7d',
    })
    res.status(200).send({
      success: true,
      message: 'login successfully',
      user:{
        name: user.name,
        email: user.email,
        phone: user.phone,
        role:  user.role
      },
      token,
    })




  } catch (error) {
    console.log(`error in login${error}`);
  }
};

export const adminController = async (req, res) =>{
  

  try {

    const users = await usermodal.find({}).select("-password");
    res.status(200).send({
      success:true,
      message: "All user fetched successfully",
      users,
    })


  } catch (error) {
    res.status(400).send({
      success: false,
      message: 'Failed to get users'
    })
  }
}

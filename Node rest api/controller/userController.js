import userDetails from "../model/userModel.js";


export const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userExist = await userDetails.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "user Already exists" });
    }

    const user = await userDetails.create({ ...req.body });
    // const userData = new User (...req.body)
    // const savedUser = await userData.save()
   return res.status(200).json(user);

  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "internal error" });
  }
  
};


export const fetchUser = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 2; // Default to 2 items per page if not provided
    const skipIndex = (page - 1) * limit; // Calculate how many documents to skip

    // Fetching users with pagination
    const users = await userDetails.find()
      .select("name email") // Select only the name and email fields
      .limit(limit) // Limit the number of documents returned
      .skip(skipIndex); // Skip the previous documents based on page

    const count = await userDetails.countDocuments(); // Get total number of users

    if (!users) {
      console.log("No users found");
      return res.status(404).json({ message: "No Users Found" });
    }

    res.status(200).json({
      totalUsers: count,
      // totalPages: Math.ceil(count / limit), // Calculate total pages
      currentPage: page,
      users, // Return the array of users
    });

  } catch (error) {
    console.log(error);
   return res.status(500).json({ error: "internal error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await userDetails.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const updateUser = await userDetails.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(201).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: "internal error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await userDetails.findOne({ _id: id });
    if (!userExist) {
     return res.status(404).json({ message: "User Not Found" });
    }
    const updateUser = await userDetails.findByIdAndDelete(id,req.body)
    res.status(201).json(updateUser);

  } catch (error) {
   return res.status(500).json({ error: "internal error" });
  }
};

export const patch = async(req,res)=>{
    try {
        const id = req.params.id;
        const userExist = await userDetails.find({_id:id});
        console.log(id);
        
        if(!userExist){
           return res.status(404).json({ message: "User Not Found" });   
        }

        const userUpdate = await userDetails.findOneAndUpdate({ _id: id },req.body,{new:true})
          return  res.status(201).json(userUpdate);

    } catch (error) {
        console.log(error);
       return res.status(500).json({ error: "internal error" });
        
    
    }
}

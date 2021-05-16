const express = require("express");
var router = express.Router();


//If exports of controller are not default and import it using {}
const {isAuthenticated,isSignedIn,isAdmin} = require("../controllers/auth");
const {getUserById,getUser,updateUser,userPurchaseList} = require("../controllers/user");

 
// route : userId (auto populate requests profile)
router.param("userId",getUserById);

///getall users parammeter
//router.get("/users",getAllUser);

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);
//user purchase list
router.get("/user/orders/:userId",isSignedIn,isAuthenticated,userPurchaseList);

//Export router instead of variable name.
module.exports = router;
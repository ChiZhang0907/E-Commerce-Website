const express = require('express');
const router = express.Router();
const {User} = require("../models/User");
const {Product} = require("../models/Product")
const {Payment} = require("../models/Payment")
const {Shoplist} = require("../models/Shoplist")
const {auth} = require("../middleware/auth");
const async = require('async');

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err)
            return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/addToCart", auth, (req, res) => {
    User.findOne({ _id: req.user._id }, (err, userInfo) => {
        let duplicate = false;

        userInfo.cart.forEach((item) => {
            if (item.id == req.body.id) {
                duplicate = true;
            }
        })


        if (duplicate) {
            User.findOneAndUpdate(
                { _id: req.user._id, "cart.id": req.body.id },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
        } else {
            User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        cart: {
                            id: req.body.id,
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
        }
    })
});


router.post("/removeFromCart", auth, (req, res) => {
    
    User.findOneAndUpdate(
        {_id: req.user._id},
        {"$pull": {"cart": {"id": req.body.id}}},
        {new: true},
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })

            Product.find({'_id': {$in: array}})
                .populate('writer')
                .exec((err, cartDetail) => {
                    return res.status(200).json({
                        cartDetail,
                        cart
                    })
                })
        }
    )
});

router.get("/cartInfo", auth, (req, res) => {
    User.findOne(
        {_id: req.user._id},
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })

            Product.find({'_id': {$in: array}})
                .populate('writer')
                .exec((err, cartDetail) => {
                    if (err) return res.status(400).send(err);
                    return res.status(200).json({success: true, cartDetail, cart})
                })

        }
    )
});

router.post("/successBuy", auth, (req, res) => {
    let history = [];
    let transactionData = {};

    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase: Date.now(),
            name: item.title,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        })
    })

    transactionData.user = {
        id: req.user._id1,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email
    }

    transactionData.data = req.body.paymentData;
    transactionData.product = history

    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: history }, $set: { cart: [] } },
        { new: true },
        (err, user) => {
            if (err) return res.json({ success: false, err });


            const payment = new Payment(transactionData)
            payment.save((err, doc) => {
                if (err) return res.json({ success: false, err });

                let products = [];
                doc.product.forEach(item => {
                    products.push({ id: item.id, quantity: item.quantity })
                })

                async.eachSeries(products, (item, callback) => {
                    Product.update(
                        { _id: item.id },
                        {
                            $inc: {
                                "sold": item.quantity
                            }
                        },
                        { new: false },
                        callback
                    )
                }, (err) => {
                    if (err) return res.json({ success: false, err })
                    res.status(200).json({
                        success: true,
                        cart: user.cart,
                        cartDetail: []
                    })
                })

            })
        }
    )
});

router.get("/history", auth, (req, res) => {
    User.findOne(
        {_id: req.user._id},
        (err, doc) => {
            let history = doc.history
            if(err) 
                return res.status(400).send(err)
            return res.status(200).json({success: true, history})
        }
    )
});

router.get("/productinlist", auth, (req, res) => {
    Shoplist.find({"user": req.user._id, "product": req.query.id})
    .exec((err, shoplist) => {
        if(err) 
            return res.status(400).send(err)
        let result = false;
        if(shoplist.length != 0)
            result = true
        res.status(200).json({success: true, productinlist: result})
    })
});

router.post("/addtolist", auth, (req, res) => {
    const listData = {
        user: req.user._id,
        product: req.body.id
    }

    const shoplist = new Shoplist(listData)

    shoplist.save((err, doc) => {
        if(err)
            return res.json({success: false})
        return res.status(200).json({success: true})
    })
});

router.post("/removefromlist", auth, (req, res) => {
    Shoplist.findOneAndDelete({user: req.user._id, product: req.body.id})
    .exec((err, doc) => {
        if(err)
            return res.status(400).json({success: false, err});
        res.status(200).json({success: true, doc})
    })
});

router.get("/listnumber", auth, (req, res) => {
    Shoplist.find({"product": req.query.id})
    .exec((err, doc) => {
        if(err)
            return res.status(400).json({success: false, err});
        let listnumber = doc.length
        res.status(200).json({success: true, listnumber: listnumber})
    })
});

router.post("/shoplist", auth, (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 100
    let skip = parseInt(req.body.skip)

    Shoplist.find({"user": req.user._id})
    .exec((err, doc) => {
        if(err) 
            return res.status(400).send(err)
        let newList = []
        
        doc.map((subscriber, index) => {
            newList.push(subscriber.product)
        })

        Product.find({"_id": {$in: newList}})
        .populate('writer')
        .skip(skip)
        .limit(limit)
        .exec((err, products) => {
            if(err)
                return res.status(400).send(err)
            res.status(200).json({success: true, products, postSize: products.length})
        })
    })

});

router.get("/recommendation", auth, (req, res) => {
    Shoplist.find({"user": req.user._id})
    .exec((err, doc) => {
        if(err) 
            return res.status(400).send(err)
        let categoryList = [
            {category: 1, number: 0},
            {category: 2, number: 0},
            {category: 3, number: 0},
            {category: 4, number: 0},
            {category: 5, number: 0},
        ]
        
        let newList = []
        
        doc.map((subscriber, index) => {
            newList.push(subscriber.product)
        })

        Product.find({"_id": {$in: newList}})
        .populate('writer')
        .exec((err, products) => {
            
            products.map((item, index) => {
                categoryList[item.category - 1].number++
            })

            let searchCategory = []

            categoryList.map((item, index) => {
                if(item.number !== 0)
                    searchCategory.push(item.category)
            })

            const sortProduct = (a, b) => {
                return categoryList[b.category - 1].number - categoryList[a.category - 1].number
            }

            Product.find({"category": {$in: searchCategory}, "_id": {$nin: newList}})
            .populate('writer')
            .exec((err, products) => {
                if(err) {
                    console.log(err)
                    return res.status(400).send(err)
                }
                products.sort(sortProduct)
                newProducts = products.slice(0, 8)
                res.status(200).json({success: true, products: newProducts})
            })

        })
    })
});

module.exports = router;
const express = require('express')
const router = express.Router();
const { jwtAuthmiddleware, generatetoken } = require('./../jwt')
const Person = require('./../models/person');

router.post('/signup', async(req, res) => {
    try {
        const data = req.body
        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('data saved');

        //payload
        const payload = {
            id: response.id,
            username: response.username
        }

        //token
        const token = generatetoken(payload)
        console.log("token :", token);

        res.status(200).json({ response: response, token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
})

router.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Person.findOne({ username: username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: "Invalid username or password" })
        }

        //generate token
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generatetoken(payload);

        res.json({ token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
})

router.get('/profile', jwtAuthmiddleware, async(req, res) => {
    try {
        const userData = req.user;
        console.log("user Data:", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Internal server error" })
    }
})

router.get('/', async(req, res) => {
    try {
        const data = await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal error" })

    }
})

//paramertised api 
router.get('/:worktype', async(req, res) => {
    try {
        const worktype = req.params.worktype;
        if (worktype == 'chef' || worktype == 'manager' || worktype == 'waiter') {

            const data = await Person.find({ work: worktype });
            console.log("data fetched");
            res.status(200).json(data);


        } else {
            res.status(400).json({ error: "invalid worktype" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal error" })

    }
})

//update through email
router.put('/:email', async(req, res) => {
    try {
        const email = req.params.email; // extrect the email
        const updatedata = req.body;

        const response = await Person.findByIdAndUpdate(email, updatedata, {
            new: true, //return the update document 
            runValidators: true // validtae the person field
        })

        if (!response) {
            res.status(400).json({ error: "data not found" });
        }
        console.log("data updated")
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal error" })

    }
})

//delete item
router.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const response = await Person.findByIdAndDelete(id);
        if (!response) {
            res.status(400).json({ error: "data not deleted" });
        }
        console.log("data deleted")
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal error" })
    }

})


module.exports = router;
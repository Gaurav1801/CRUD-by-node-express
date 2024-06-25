const express = require('express');
const router = express.Router();
const Menuitem = require('./../models/Menu');


router.post('/', async(req, res) => {
    try {
        const data = req.body;
        const newMenu = new Menuitem(data);

        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
})

router.get('/', async(req, res) => {
    try {
        const data = await Menuitem.find();
        console.log("data fetched");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal error" })

    }
})

router.get('/:taste', async(req, res) => {
    try {
        const taste = req.params.taste;
        if (taste == 'sour' || taste == 'sweet' || taste == 'spicy') {

            const data = await Menuitem.find({ taste: taste });
            console.log("data fetched");
            res.status(200).json(data);
        } else {
            res.status(500).json({ error: "invalid taste" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal error" })

    }
})

router.put('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const updatemenu = req.body;
        const response = await Menuitem.findByIdAndUpdate(id, updatemenu, {
            new: true,
            runValidators: true
        })
        if (!response) {
            res.status(500).json({ error: 'data not found' });
        }
        console.log("data updated")
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal error" })

    }
})

router.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const response = await Menuitem.findByIdAndDelete(id)

        if (!response) {
            res.status(500).json({ error: 'data not delete' });
        }
        console.log("data delete")
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal error" })

    }


})

module.exports = router;
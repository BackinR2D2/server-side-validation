const router = require('express').Router();
const axios = require('axios');
const joi = require('joi');

const schema = joi.object({
    username: joi.string().email().trim().max(256).required(),
    password: joi.string().max(10).trim().required()
})

// POST /login 
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const validation = await schema.validateAsync({ username, password });
        if (validation.error === undefined) {
            const payload = {
                username, password
            }
            const { data } = await axios.post('/_session', payload);
            return res.status(201).json({
                status: 1,
                data,
            })
        } else {
            return res.status(400).json({
                status: 0,
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 0
        })
    }
})
// DELETE /logout

router.delete('/logout', async (req, res) => {
    try {
        const { data } = await axios.delete('/_session');
        res.status(201).json({
            status: 1,
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
        })
    }
})

module.exports = router;

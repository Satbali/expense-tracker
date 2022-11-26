import { Router } from "express";
import Transaction from "../models/Transaction.js";
const router = Router()

// A GET route for receving somthing from the frontend
router.get('/transaction', async (req, res) => {
    const transaction = await Transaction.find({}).sort({ createdAt: -1 })
    res.json({ data: transaction })
})

// A POST route for send somthing from the frontend
router.post('/transaction', async (req, res) => {
    // Taking out the parameters to be stored in DB using models/Schema by the help of body parser
    const { amount, description, date } = req.body;
    // Giving accsess to models/schema
    const transaction = new Transaction({
        amount,
        description,
        date
    })
    // Saving the schema
    await transaction.save()
    res.json({ message: 'success' })
})

export default router
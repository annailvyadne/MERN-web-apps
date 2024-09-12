const router = require('express').Router();
let Expense = require('../models/expense.model');

// Get all expenses
router.route('/').get((req, res) => {
  Expense.find()
    .then(expenses => res.json(expenses))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add new expense
router.route('/add').post((req, res) => {
  const date = Date.parse(req.body.date);
  const amount = Number(req.body.amount);
  const category = req.body.category;
  const description = req.body.description;

  const newExpense = new Expense({
    date,
    amount,
    category,
    description,
  });

  newExpense.save()
    .then(() => res.json('Expense added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get an expense by id
router.route('/:id').get((req, res) => {
  Expense.findById(req.params.id)
    .then(expense => res.json(expense))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete an expense
router.route('/:id').delete((req, res) => {
  Expense.findByIdAndDelete(req.params.id)
    .then(() => res.json('Expense deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update an expense
router.route('/update/:id').post((req, res) => {
  Expense.findById(req.params.id)
    .then(expense => {
      expense.date = Date.parse(req.body.date);
      expense.amount = Number(req.body.amount);
      expense.category = req.body.category;
      expense.description = req.body.description;

      expense.save()
        .then(() => res.json('Expense updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

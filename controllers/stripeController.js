const stripe = require("stripe")(process.env.SECRET_KEY);

module.exports = {
    payment: async (req, res) => {
        const amount = req.body.amount; // 500 cents means $5
        const token = stripe.tokens.create({     //create token for valid credit cards; (if card is not valid will return
            // cannot charge a customer that has no active card)
            card: {
                number: '4242424242424242',
                exp_month: 12,
                exp_year: 2023,
                cvc: '123'
            }
        });
        // create a customer
        stripe
            .customers
            .create({
                email: 'ttd86@ukr.net',
                source: process.env.TEST_VISA
            })
            .then(customer => {
                stripe
                    .charges
                    .create({ // charge the customer
                        amount,
                        description: "Test Charge",
                        currency: "usd",
                        customer: customer.id
                    })
                    .then(charge => res
                        .status(200)
                        .json({
                            charge: charge,
                            customer: customer
                            // "Status": charge.paid,
                            // "Amount": charge.amount,
                            // "Email": charge.email,
                            //"Type": charge.payment_method_details.type,
                            //"Currency":charge.currency

                        }))
                    .catch(err => {
                        res.status(404).json({error: err.message});
                    });

            })
            .catch(err => {
                res.status(404).json({error: err.message});
            });

    },
};

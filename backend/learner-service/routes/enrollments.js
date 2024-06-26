const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const Enrollment = require('../models/enrollmentModel')

const { 
    getEnrollments,
    getMyEnrollments,
    getEnrollment,
    createUserEnroll,
    deleteEnroll,
    // handleCheckoutSuccess
} = require('../controllers/enrollmentController');

const router = express.Router();

// POST a new enrollment
router.post("/create-checkout-session", createUserEnroll);

// Route to handle successful payment
// router.post("/success", handleCheckoutSuccess);

// GET a single enrollment
router.get('/:uid/:cid', getEnrollment);

// GET all enrollments
router.get('/', getEnrollments);

// GET all my enrollments
router.get('/:id', getMyEnrollments);

// DELETE a enrollment
router.delete('/:id', deleteEnroll);

//////
let endpointSecret;


sendEmail = async (body) => {
    const emailData = {
      to: body.email,
      subject: "Course Purchased",
      text: `The course ${body.courseTitle} has been purchased.`
    };
    
    console.log(JSON.stringify(emailData));
    const emailResponse = await fetch(
      "http://localhost:9123/send-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(emailData)
      }
    );


    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      throw new Error(`Failed to send email: ${errorText}`);
    }
  };

  const sendSMS = async (body) => {
    const smsData = {
      to: '+94720706833',
      text: `The course ${body.courseTitle} has been purchased.`
    };

    console.log(JSON.stringify(smsData));
    const smsResponse = await fetch(
      "http://localhost:3001/send-sms",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(smsData)
      }
    );


    if (!smsResponse.ok) {
      const errorText = await smsResponse.text();
      throw new Error(`Failed to send sms: ${errorText}`);
    }
  };




// Success handler for Stripe checkout session
const handleCheckoutSuccess = async (customer, data) => {
    const { uid, cid, courseTitle } = customer.metadata;
    const pid = data.payment_intent;
    const email = customer.email;
    const emailBody = {email, courseTitle}
    console.log("customerHandle", customer)
    console.log("customerMetadata", customer.metadata)
    console.log("uid", uid, "cid", cid, "pid", pid)

    const newEnrollment = new Enrollment({
        uid: uid,
        cid: cid,
        payment: pid,
        paymentType: "Card"

    });

    try {
        const savedOrder = await newEnrollment.save();
        sendEmail(emailBody);
        sendSMS(emailBody);

        console.log("SavedOrder", savedOrder);
    } catch (error) {
        console.log("Error", error);
    }
}


router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

    let data;
    let eventType;


  if (endpointSecret) {
      let event;
    
      try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        console.log("Webhook verified");
      } catch (err) {
        console.log("Webhook Erroe:", err.message);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      data= event.data.object;
      eventType = event.type;
    }else {
        data = request.body.data.object;
        eventType = request.body.type;
    }


  // Handle the event
    if (eventType === 'checkout.session.completed') {
        stripe.customers.retrieve(data.customer).then((customer) => {
            console.log("CustomerData", customer);
            console.log("Data", data);
            handleCheckoutSuccess(customer, data)
        }).catch((err) => {
            console.log("Error", err.message);
        })
    }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
});

module.exports = router;

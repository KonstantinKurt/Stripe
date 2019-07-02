const paymentButtonClick = async () => {
    document.getElementById('payment').addEventListener('click', fillDataDivs);
};
const sendPaymentRequest = async () => {
    try {

        const amount = parseInt(document.getElementById('amount').value);
        const email = document.getElementById('email').value;
        const requestObj = {
            amount: amount * 100,
            email: email,
        };
        const response = await axios({
            url: '/stripe',
            method: 'post',
            data: requestObj
        });
         return await response.data;
    } catch (err) {
        console.log({error: err.message});
    }
};
const fillDataDivs = async() => {
    document.getElementById('form').style.visibility = 'hidden';
    const data = await sendPaymentRequest();
    console.log(data.customer);
    const customerDiv = document.getElementById('customer');
    customerDiv.style.visibility = "visible";
    customerDiv.innerHTML = await JSON.stringify(data.customer);
};


window.onload = () => {
    paymentButtonClick();
};

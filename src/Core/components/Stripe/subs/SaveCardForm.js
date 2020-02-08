import React from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements'

// const SaveCardForm = ({ elements, stripe }) => {

//   console.log(stripe)
//   const cardElement = elements.getElement('card');
//   if (stripe){
//     stripe.createToken()
//     .then( res => console.log(res))
//   } else {
//     console.log('no stripes here')
//   }

//   return(
//     <div className='save-payment-form'>
//       <CardElement />

//     </div>
//   )

// }

export default injectStripe(SaveCardForm);
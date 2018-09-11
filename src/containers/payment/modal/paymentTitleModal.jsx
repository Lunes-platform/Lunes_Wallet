import React from "react";

// COMPONENTS
import DetailsPayment from "./detailsPayment";
import FeePayment from "./feePayment";
import ConfirmPayment from "./confirmPayment";
import SecurePayment from "./securePayment";
import DonePayment from "./donePayment";

class PaymentTitleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    };

    this.handleStep = this.handleStep.bind(this);
  }

  handleStep(action){
    if(action==="next"){
      this.setState({step: this.state.step+1});
    }
    if(action==="prev"){
      this.setState({step: this.state.step-1});
    }
  }

  render() {
    switch(this.state.step){
      case 1:
        return <DetailsPayment handleStep={this.handleStep} />
      case 2:
        return <FeePayment handleStep={this.handleStep} />
      case 3: 
        return <ConfirmPayment handleStep={this.handleStep} />
      case 4:
        return <SecurePayment handleStep={this.handleStep} />
      case 5: 
        return <DonePayment handleStep={this.handleStep} />
    }
  }
}

export default PaymentTitleModal;
import PaymentComponent from "../PaymentWidget/PaymentComponent";
import { Container } from "react-bootstrap";

const Checkout = () => {
    return ( 
        <Container>
                    <PaymentComponent
                        keys={{
                            stripe: "pk_test_51KTD5GBbdooSCxMFV8hLU7XFToVcCR3YwXYCPnz7qvzb0yFZEHnwV946NZweNl86HuuvptZ5vtVcO09fBAp8GwuS00lOOKonsO"
                            }}
                    />
                  </Container>
     );
}
 
export default Checkout;
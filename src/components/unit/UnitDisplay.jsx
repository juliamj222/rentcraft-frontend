import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import React, { useState, useEffect } from "react";

function UnitDisplay(props) {
  const {
    user_id,
    tenant_id,
    address,
    city,
    state,
    zip,
    monthlyRent,
    unitState,
  } = props.unit;

  //const [payments, setPayments] = useState([]);

  /* create a function to get the payments */
  /* create a function to edit the payments */
  /* create a function to log payments */

  return (
    <>
      <Card className="m-2">
        <CardBody>
          <CardTitle tag="h5">{address}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {city}
            {state}
            {zip}
          </CardSubtitle>
          <CardText>
            {monthlyRent} {unitState} {tenant_id} {user_id}
          </CardText>
          {/*           {payments.map((payment, index) => ()}
          <Form>
            <FormGroup>
              <Input
                id="payment"
                name="payment"
                placeholder="Enter payment"
                type="payment"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              />
            </FormGroup>
            <Button onClick={createPayment}>Submit payment</Button>
          </Form> */}
        </CardBody>
      </Card>
    </>
  );
}

export default UnitDisplay;

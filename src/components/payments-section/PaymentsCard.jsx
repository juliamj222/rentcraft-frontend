import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Input, Label } from 'reactstrap';


function PaymentsCard(props) {

  const { date, unit_id, tenant_id, user_id, _id, amount, paymentsState, type } = props.payment

  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [unitInput, setUnitInput] = useState(unit_id);

  function handleToggleEdit() {
    setEditModeEnabled(!editModeEnabled)
  }

  async function handleEdit() {
    
    try {

      // Headers
      let myHeaders = new Headers()
      myHeaders.append("Authorization", props.token)
      myHeaders.append("Content-type", "application/json")

      // Body
      const body = { }
      
    } catch (error) {

      console.error(error)
      
    }
  }

  return (
    <>
      <Card>
        <CardBody>
          
          {/* Select Unit */}
          {editModeEnabled ? ( <>
            <Label for='selectUnit'>UNIT</Label>
            <Button
            id='selectUnit'
            type='button'
            data-toggle ='dropdown'
            value={unitInput}
            onChange={(e) => setUnitInput(e.target.value)}
            />
          </>) : <CardTitle>Unit ID: {unit_id}</CardTitle>}

          <CardSubtitle>Tenant ID: {tenant_id}</CardSubtitle>

          <CardText>Amount: {amount}</CardText>

        </CardBody>
      </Card>
    </>
  );
}


export default PaymentsCard;
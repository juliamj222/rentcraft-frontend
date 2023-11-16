import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import React, { useState, useEffect } from 'react';
import { API_PAYMENTS_CREATE, API_TENANTS_VIEW_ALL, API_UNIT_VIEW_BY_USER } from "../constants/endpoints";

// let unitInfo = [
//   {
//       "_id": "6553c8c4ee87c365de7582b2",
//       "user_id": "654bf00e29feba843cd679d5",
//       "address": "177 Main Street",
//       "city": "Winooski",
//       "state": "Vt ",
//       "zip": "05404",
//       "monthlyRent": 2000,
//       "unitState": "Vacant",
//       "__v": 0
//   },
//   {
//       "_id": "6553c8d5ee87c365de7582b5",
//       "user_id": "654bf00e29feba843cd679d5",
//       "address": "2268 Main Street",
//       "city": "Burlington",
//       "state": "Vt",
//       "zip": "05404",
//       "monthlyRent": 7000,
//       "unitState": "Vacant",
//       "__v": 0
//   },
//   {
//       "_id": "6555179b95675976c2984d6a",
//       "user_id": "654bf00e29feba843cd679d5",
//       "address": "Hello",
//       "city": "",
//       "state": "",
//       "zip": "",
//       "monthlyRent": null,
//       "unitState": "",
//       "__v": 0
//   },
//   {
//       "_id": "6555185c95675976c2984d70",
//       "user_id": "654bf00e29feba843cd679d5",
//       "address": "Home",
//       "city": "",
//       "state": "",
//       "zip": "",
//       "monthlyRent": null,
//       "unitState": "",
//       "__v": 0
//   }
// ]

function PaymentsCreate(props) {

  const [unit_id, setUnit_id] = useState("");
  const [tenant_id, setTenant_id] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentState, setPaymentState] = useState("");
  
  // functions to populate dropdown
  const [unitData, setUnitData] = useState([]);
  const [tenantData, setTenantData] = useState([]);

  async function fetchUnits() {
    
    try {

      // Headers
      const myHeaders = new Headers()
      myHeaders.append("Authorization", props.token)

      // Request Options
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
      }

      // Send Request
      const response = await fetch(API_UNIT_VIEW_BY_USER + "/" + props.currentId, requestOptions)

      // Get a Response
      const data = await response.json()
      console.log(data)
      
      // Set State
      setUnitData(data.user_units)
      
    } catch (error) {

      console.error(error)
      
    }

  }

  async function fetchTenants() {
    
    try {

      // Headers
      const myHeaders = new Headers()
      myHeaders.append("Authorization", props.token)

      // Request Options
      let requestOptions = {
        method: "GET",
        headers: myHeaders
      }

      // Send Request
      const response = await fetch(API_TENANTS_VIEW_ALL + "/" + props.currentId, requestOptions)

      // Get a Response
      const data = await response.json()
      console.log(data)

      // Set State
      setTenantData(data.user_tenants)
      
    } catch (error) {

      console.error(error)
      
    }

  }

  useEffect(() => {
    if (!props.token) return;
    fetchUnits()
    fetchTenants()
  }, [props.token]);

  async function handleSubmit() {
    
    try {

      // Headers
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")
      myHeaders.append("Authorization", props.token)

      // Body
      let body = {
        unit_id: unit_id,
        tenant_id: tenant_id,
        date: date,
        amount: amount,
        paymentState: paymentState
      }

      // Request Options
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      }

      // Send Request
      const response = await fetch(API_PAYMENTS_CREATE, requestOptions)

      // Get a response
      const data = await response.json()
      
      // Refresh the payments feed
      props.fetchPaymentsFeed()
      console.log(data)
      
    } catch (error) {

      console.error(error)
      
    }

  }

  return (
    <>
      <div>

        <h4>Create a payment</h4>

        <Form>

          {/* Select Unit */}
          <FormGroup>
            <Label for='selectUnit'>Select Unit</Label>
            <Input
              id="selectUnit"
              name="selectUnit"
              type="select"
              // type="text"
              value={unit_id}
              onChange={(e) => setUnit_id(e.target.value)}
            >
              {unitData.map((unit, index) => <option key={index} value={unit._id}>{unit.address}</option>)}
            </Input>
          </FormGroup>

          {/* Select Tenant */}
          <FormGroup>
            <Label for='selectTenant'>Select Tenant</Label>
            <Input 
              id="selectTenant"
              name="selectTenant"
              type="select"
              // type="text"
              value={tenant_id}
              onChange={(e) => setTenant_id(e.target.value)}
            >
              {tenantData.map((tenant, index) => <option key={index} value={tenant._id}>{tenant.firstName} {tenant.lastName}</option>)}
              {/* <option>65538d7b3fabec24e4725638</option>
              <option>6553cc7f8f916efb8ba24a60</option>
              <option>6553d01d8f916efb8ba24a73</option>
              <option>6553d6e08f916efb8ba24a78</option> */}
            </Input>
          </FormGroup>

          {/* Select Amount */}
          <FormGroup>
            <Label for="selectAmount">Enter $ Amount</Label>
            <Input 
              id="selectAmount"
              name="selectAmount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            >
            </Input>
          </FormGroup>

          {/* Select Date */}
          <FormGroup>
            <Label for="selectDate">Select Date</Label>
            <Input 
              id="selectDate"
              name="selectDate"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormGroup>

          {/* Select Payment State (Full, Partial etc.) */}
          <FormGroup>
            <Label for="selectPaymentState">Select Type of Payment</Label>
            <Input 
              id="selectPaymentState"
              name="selectPaymentState"
              type="select"
              value={paymentState}
              onChange={(e) => setPaymentState(e.target.value)}
            >
              <option>Full Payment</option>
              <option>Partial Payment</option>
              <option>Late Payment</option>
              <option>Deposit</option>
              <option>Refund</option>
            </Input>
          </FormGroup>

          {/* Create Payment Button */}
          <Button onClick={handleSubmit}>Create Payment</Button>

        </Form>

      </div>
    </>
  );
}


export default PaymentsCreate;
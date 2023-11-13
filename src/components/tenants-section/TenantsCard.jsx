import { useParams } from "react-router-dom";
import { Card, CardBody, CardText } from "reactstrap";
import React, { useState } from 'react';

function TenantsCard(props) {

  const params = useParams()
  // console.log(params)

  const { firstName, lastName, phone, email, _id } = props.tenant

  async function name(params) {
    
  }

  return (
    <>
      <h1>Hello from TenantsCard</h1>
      <Card>
        <CardBody>
          <CardText>{firstName} {lastName}</CardText>
          <CardText>{email}</CardText>
          <CardText>{phone}</CardText>
          <CardText>Tenant ID: {_id}</CardText>
        </CardBody>
      </Card>
    </>
  );
}


export default TenantsCard;
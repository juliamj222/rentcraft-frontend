import { useParams } from "react-router-dom";
import TenantsCreate from "./TenantsCreate";
import TenantsFeed from "./TenantsFeed";
import React, { useState, useEffect } from 'react';
import { API_TENANTS_VIEW_ALL } from "../constants/endpoints";

function TenantsIndex(props) {

    const [tenantsList, setTenantsList] = useState([]);

    async function fetchTenants() {
        
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
            const response = await fetch(API_TENANTS_VIEW_ALL, requestOptions)

            // Get a Response
            const data = await response.json()

            // Set State
            setTenantsList(data.tenants)
            
        } catch (error) {
            
            console.error(error)

        }
    }

    useEffect(() => {
        if(!props.token) return;
        fetchTenants()
    }, [props.token]);

  return (
    <>
        <h1>Hello from TenantsIndex</h1>
        <TenantsCreate />
        <TenantsFeed tenantsList={tenantsList} token={props.token} />
    </>
  );
}


export default TenantsIndex;
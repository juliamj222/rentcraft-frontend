import { useParams } from "react-router-dom";
import TenantsCreate from "./TenantsCreate";
import TenantsFeed from "./TenantsFeed";
import React, { useState, useEffect } from "react";
import { API_TENANTS_VIEW_ALL } from "../constants/endpoints";
import { Button } from "reactstrap";
import ReturnToAuth from "../navigation-section/ReturnToAuth";

function TenantsIndex(props) {
  const params = useParams();

  const [tenantsList, setTenantsList] = useState([]);

  async function fetchTenants() {
    try {
      // Headers
      const myHeaders = new Headers();
      myHeaders.append("Authorization", props.token);

      // Request Options
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      // Send Request
      const response = await fetch(
        API_TENANTS_VIEW_ALL + "/" + props.currentId,
        requestOptions
      );

      // Get a Response
      const data = await response.json();
      // console.log(data)

      // Set State
      setTenantsList(data.user_tenants);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!props.token) return;
    fetchTenants();
  }, [props.token]);
  if (!props.token) return <ReturnToAuth />;
  const hasTenants = tenantsList && tenantsList.length > 0;

  return (
    <>
      {hasTenants ? (
        <TenantsFeed
          fetchTenants={fetchTenants}
          tenantsList={tenantsList}
          token={props.token} 
          currentId={props.currentId}
        />
      ) : (
        <TenantsCreate
          fetchTenants={fetchTenants}
          token={props.token}
          currentId={props.currentId}
        />
      )}
    </>
  );
}

export default TenantsIndex;

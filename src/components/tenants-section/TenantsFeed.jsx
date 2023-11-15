import TenantsCard from "./TenantsCard";

function TenantsFeed(props) {
  return (
    <>
        {props.tenantsList.map((tenant, index) => (
            <TenantsCard 
            key={index} 
            tenant={tenant} 
            token={props.token} 
            fetchTenants={props.fetchTenants}
            />
        ))}
    </>
  );
}


export default TenantsFeed;
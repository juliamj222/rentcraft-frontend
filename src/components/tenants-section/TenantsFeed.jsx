import TenantsCard from "./TenantsCard";

function TenantsFeed(props) {
  return (
    <>
        <h1>Hello from TenantsFeed</h1>
        {props.tenantsList.map((tenant, index) => (
            <TenantsCard key={index} tenant={tenant} token={props.token} />
        ))}
    </>
  );
}


export default TenantsFeed;
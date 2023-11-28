import ReturnToAuth from "../navigation-section/ReturnToAuth";
import TenantsCard from "./TenantsCard";
import { Button } from "reactstrap";

function TenantsFeed(props) {
  if (!props.token) return <ReturnToAuth />; 
  console.log(props)

  console.log(props.tenantsList);
  return props.tenantsList
    .filter((tenant) => tenant.active === true)
    .map((tenant) => {
      console.log("TENANT", tenant.email);
      console.log(tenant.active);

      return (
        <>
          <div
            style={{
              display: "flex",
              direction: "row",
              flexWrap: "wrap",
              // alignItems: "center",
              justifyContent: "space-between",
              // borderRadius: "10px",
              marginTop: "40px"
            }}
          >
            <Button
              href="/tenant/create"
              style={{
                background: "var(--secondary)",
                padding: "1%",
                color: "black",
                marginTop: "1%",
                marginBottom: "1%",
                marginLeft: "30%",
                marginRight: "30%",

                justifyContent: "center",
                borderRadius: "10px",
              }}
            >
              Register a new tenant
            </Button>


          {props.tenantsList.map((tenant, index) => (
            <TenantsCard
              key={index}
              tenant={tenant}
              token={props.token}
              fetchTenants={props.fetchTenants} 
              currentId={props.currentId}
            />
          ))}
          </div>
        </>
      );
    });
}
export default TenantsFeed;

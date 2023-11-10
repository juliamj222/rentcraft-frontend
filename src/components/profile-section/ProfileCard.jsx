import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Label } from "reactstrap";

function ProfileCard(props) {

    // Variables go here

    async function handleEdit() {

        // console.log("Edit button works")

        // Headers

        // Body

        // Request Options

        // Send Request

        // Get a Response

        // ? Refresh the card

        // Change the edit mode to false

    }

    async function handleDelete() {
        
        // console.log("Delete Works")

        try {

            // Headers

            // Request Options

            // Send Request

            // Get a Response

            // ? Refresh the page
            
        } catch (error) {

            console.error(error)

        }

    }

  return (
    <>
        <h1>Hello from ProfileCard</h1>
        <Card>
            <CardBody>

                <CardTitle>
                    Title of card
                    <>
                        <Label for="email">Email</Label>
                    </>
                </CardTitle>

                <CardSubtitle>
                    Subtitle of card
                </CardSubtitle>

                <CardText>
                    Text of card
                    <>
                        <Label for="lastName">Last Name</Label>
                        <Label for="password">Password</Label>
                    </>
                    <>
                        <Label for="firstName">First Name</Label>
                    </>
                </CardText>

                <Button color="warning" onClick={handleEdit}>EDIT</Button>

                <Button color="danger" onClick={handleDelete}>DELETE</Button>

            </CardBody>
        </Card>
    </>
  );
}


export default ProfileCard;
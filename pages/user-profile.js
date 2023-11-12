function UserProfile(props) {
  return <div>{props.name}</div>;
}

async function getData() {
   
        return {
          props: { name: "Anoop" },
        };
     

}

export async function getServerSideProps(context) {
  
    const data = await getData();
    return data;
}

export default UserProfile;

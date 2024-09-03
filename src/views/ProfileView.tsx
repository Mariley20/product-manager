import { useAuthStore } from "@/store/authStore"
import Container from "@mui/material/Container"

function ProfileView() {
  const user = useAuthStore((state) => state.user)


  // const [count, setCount] = useState(0)

  return (
    <Container>
      <div>
        <b>Full name: </b> <span>{user?.name || ''}</span> <span>{user?.lastname || ''}</span>
      </div>
      <div>
        <b>email: </b> <span>{user?.email || ''}</span>
      </div>
       <div>
        <b>Phone number: </b> <span>{user?.phonenumber || ''}</span>
      </div>
      <div>
        <b>Number document(DNI): </b> <span>{user?.dni || ''}</span>
      </div>
    </Container>
  )
}

export default ProfileView
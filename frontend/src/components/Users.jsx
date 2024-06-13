import blogService from "../services/blogService"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../redux/reducers/usersSlice";
import { Link } from 'react-router-dom'
import Footer from "./Footer";
import Header from "./Header";
import { Table } from "react-bootstrap";

const Users = () => {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users)

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const users = await blogService.fetchUsers();
            dispatch(setUsers(users));
          } catch (error) {
            console.error("Failed to fetch users", error);
          }
        };
        fetchUsers();
      }, [dispatch]);

    return (
        <div className="container mt-4">
      {users && <Header />}
      <Table striped bordered hover>
          <thead>
              <tr>
                  <th>
                      Name
                  </th>
                  <th>
                      Blogs created
                  </th>
              </tr>
          </thead>
          <tbody>
                    {users
                    .slice()
                    .sort((a, b) => b.blogs.length - a.blogs.length)
                    .map((user) => (
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`} className='custom_link'>{user.name}</Link>
                            </td>
                            <td>
                                {user.blogs.length}
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </Table> 
            <Footer />
        </div>
    )
}

export default Users

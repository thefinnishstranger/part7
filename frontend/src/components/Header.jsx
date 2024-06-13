import { useSelector } from "react-redux";


const Header = () => {
    const user = useSelector((state) => state.authentication.user);

    if (!user) {
        return null
    }
    return (
        <div>
            <h2 className="blog_text">Blogs</h2>
            <p>{user.name} logged-in</p>
        </div>
    )
}

export default Header
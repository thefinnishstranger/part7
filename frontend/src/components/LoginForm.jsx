import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setLoginField, clearLoginForm } from "../redux/reducers/formSlice";
import { Button } from "react-bootstrap";

const LoginForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const { username, password } = useSelector(state => state.form.login);

  const handleUsernameChange = (event) => {
    dispatch(setLoginField({ field: "username", value: event.target.value }));
  };

  const handlePasswordChange = (event) => {
    dispatch(setLoginField({ field: "password", value: event.target.value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(username, password);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="username">
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
          placeholder="username"
        />
      </div>
      <div className="password">
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
          placeholder="password"
        />
      </div>
      <Button type="submit" variant="dark grey" className="login_button">login</Button>
    </form>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default LoginForm;

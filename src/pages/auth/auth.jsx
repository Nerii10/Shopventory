import { useEffect, useState } from "react";
import Input from "../../components/Input";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { login, logout, userData: loggedUser } = useUser();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    Login: "",
    Password: "",
  });

  useEffect(() => {
    if (loggedUser) {
      navigate("/dashboard");
    }
  }, [loggedUser]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(userData);
        }}
      >
        <h1>Login</h1>
        <Input
          type="text"
          children="Login"
          value={userData.Login}
          setValue={(e) => setUserData((prev) => ({ ...prev, Login: e }))}
        />
        <Input
          type="password"
          children="Hasło"
          value={userData.Password}
          setValue={(e) => setUserData((prev) => ({ ...prev, Password: e }))}
        />
        <Input type="submit" children="Zaloguj" />
      </form>

      {loggedUser ? `Zalogowany - ${loggedUser.login}` : "Nie zalogowany"}
      {loggedUser && (
        <Input
          type={"button"}
          children={"wyloguj"}
          onClick={() => {
            logout();
          }}
        />
      )}
    </>
  );
}

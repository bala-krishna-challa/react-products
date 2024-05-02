import React, { useEffect, useState } from "react";
import Register from "../../Register/Register";
import { TOKEN } from "../../constants";
import useHttp from "../../hooks/useHttp";
import Model from "../../Model/Model";

interface User {
  name: string;
  emailId: string;
}

interface UserListProps {
  users: User[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <ul>
      {users.map(({ emailId, name }) => {
        return <li key={emailId}>{`${name} - ${emailId}`}</li>;
      })}
    </ul>
  );
};

const AddUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { loading, errorMessage, statusCode, data, initiateRequest } =
    useHttp<UserListProps>({
      uri: "users",
    });

  useEffect(() => {
    if (statusCode && statusCode.toString().startsWith("2") && data) {
      setUsers(data.users);
    }
  }, [statusCode, data]);

  return (
    <>
      <Register onUserCreation={() => initiateRequest()} />
      <UserList users={users} />
      {loading && <Model />}
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};

export default AddUser;

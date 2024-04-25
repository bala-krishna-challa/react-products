import React, { useEffect, useState } from "react";
import Register from "../Register/Register";

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

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");

      const data = await response.json();
      setUsers(data.users);

      console.log("data", data);
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleUserCreation = () => {
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Register onUserCreation={handleUserCreation} />
      <UserList users={users} />
    </>
  );
};

export default AddUser;

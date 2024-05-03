import React, { useEffect, useState, useContext } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { TOKEN } from "../constants";
import Register from "../Register/Register";
import useHttp from "../hooks/useHttp";

type Picture = {
  large: string;
};

interface User {
  name: string;
  emailId: string;
  picture: Picture;
  phone: string;
  cell: string;
  isActive: boolean;
  id: string;
}

interface UserListProps {
  users: User[];
}

const Card = (props) => {
  const classes = "card " + props.className;
  return <div className={classes}>{props.children}</div>;
};

const CardHeader = (props) => {
  const classes = "card-header " + props.className;
  return <div className={classes}>{props.children}</div>;
};

const CardBody = (props) => <div className="card-body">{props.children}</div>;

const UserHeaderAction = ({ id, selectedUserId, setSelectedUserId }) => {
  let action =
    selectedUserId === id ? (
      <FaTimes
        className="icon"
        role="button"
        onClick={() => setSelectedUserId(null)}
      />
    ) : (
      <FaBars
        className="icon"
        role="button"
        onClick={() => setSelectedUserId(id)}
      />
    );
  return action;
};

const UserHeader = ({ name }) => {
  return (
    <h5 className="user-card-header">
      <FaUser className="icon icon-user" />
      <span>{name}</span>
    </h5>
  );
};

const UserCardHeader = ({
  id,
  selectedUserId,
  fname,
  lname,
  setSelectedUserId,
}) => (
  <CardHeader className="border-0">
    <UserHeader name={fname + " " + lname} />
    <UserHeaderAction
      id={id}
      selectedUserId={selectedUserId}
      setSelectedUserId={setSelectedUserId}
    />
  </CardHeader>
);

const UserCardBody = (props) => {
  const classes = props.truncate
    ? "user-card-body text-truncate"
    : "user-card-body";
  return <div className={classes}>{props.children}</div>;
};

const UserCardBodyFront = ({
  name,
  emailId,
  selectedUserId,
  setSelectedUserId,
  picture,
  id,
}) => {
  return (
    <React.Fragment>
      <UserThumbnail
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        image={picture.large}
        id={id}
      />
      <UserDetailsPrimary
        username={name}
        emailId={emailId}
        dob="20-04-2000"
        gender="Male"
      />
    </React.Fragment>
  );
};

const UserCardBodyBack = (props) => {
  return (
    <UserDetailsContact
      emailAddress={props.emailId}
      cell={props.cell}
      phone={props.phone}
    />
  );
};

const UserThumbnail = ({ id, image, selectedUserId, setSelectedUserId }) => {
  // const idToSelect = selectedUserId === id ? null : id;

  return (
    <div className="user-thumbnail">
      <img
        onClick={() => setSelectedUserId(id)}
        alt="User thumbnail"
        role="button"
        src={image}
      />
    </div>
  );
};

const UserField = (props) => {
  let valClasses = "col-8 user-field-value";
  if (props.truncate) {
    valClasses += " text-truncate";
  }
  return props.value ? (
    <React.Fragment>
      <div className="col-4 user-field">{props.field}:</div>
      <div className={valClasses}>{props.value}</div>
    </React.Fragment>
  ) : null;
};

const UserDetailsPrimary = (props) => {
  return (
    <div className="user-details">
      <div className="row">
        {Object.keys(props).map((key) => (
          <UserField key={key} field={key} value={props[key]} truncate={true} />
        ))}
      </div>
    </div>
  );
};

const UserDetailsContact = (props) => {
  return (
    <div className="user-details">
      <div className="row">
        {Object.keys(props).map((key) => (
          <UserField key={key} field={key} value={props[key]} />
        ))}
      </div>
    </div>
  );
};

const UserTileCard = (props) => {
  const cardClass = props.front ? "front" : "back";
  const bodyContent = props.front ? (
    <UserCardBodyFront {...props} />
  ) : (
    <UserCardBodyBack {...props} />
  );

  return (
    <div className={cardClass}>
      <Card className="border-0 box-shadow">
        <UserCardHeader
          selectedUserId={props.selectedUserId}
          fname={props.name}
          lname={props.name}
          id={props.id}
          setSelectedUserId={props.setSelectedUserId}
        />
        <CardBody>
          <UserCardBody truncate={props.front}>{bodyContent}</UserCardBody>
        </CardBody>
      </Card>
    </div>
  );
};

const UserTile = ({ user, selectedUserId, setSelectedUserId }) => {
  let contentCls = "content";
  if (selectedUserId === user.id) {
    contentCls += " flipped";
  }
  return (
    <div className="col-xl-4 col-lg-6 mb-4">
      <div className="flip">
        <div className={contentCls}>
          <UserTileCard
            front={true}
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            {...user}
          />
          <UserTileCard
            front={false}
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            {...user}
          />
        </div>
      </div>
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { statusCode, data, initiateRequest } = useHttp<UserListProps>({
    uri: "users",
  });

  useEffect(() => {
    if (statusCode && statusCode.toString().startsWith("2") && data) {
      setUsers(data.users);
    }
  }, [statusCode, data]);

  const resetSelectedUser = (id) => {
    let user = null;
    if (id) {
      user = users.find((u) => u.id === id);
    }
    setSelectedUserId(id);
  };

  return (
    <div>
      <Register onUserCreation={() => initiateRequest()} />
      <div className="main-content">
        <h3 className="header">Platform Users</h3>
        <div className="row">
          {users.length > 0 &&
            users.map((user) => (
              <UserTile
                key={user.id}
                user={user}
                selectedUserId={selectedUserId}
                setSelectedUserId={setSelectedUserId}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
export default Users;

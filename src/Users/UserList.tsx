import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import React from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
const Card = (props) => {
  const classes = "card " + props.className;
  return <div className={classes}>{props.children}</div>;
};

const CardHeader = (props) => {
  const classes = "card-header " + props.className;
  return <div className={classes}>{props.children}</div>;
};

const CardBody = (props) => <div className="card-body">{props.children}</div>;

const UserHeaderAction = ({ id }) => {
  const { selectedUserId, setSelectedUserId } = useContext(UserContext);
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

const UserCardHeader = ({ id, fname, lname }) => (
  <CardHeader className="border-0">
    <UserHeader name={fname + " " + lname} />
    <UserHeaderAction id={id} />
  </CardHeader>
);

const UserCardBody = (props) => {
  const classes = props.truncate
    ? "user-card-body text-truncate"
    : "user-card-body";
  return <div className={classes}>{props.children}</div>;
};

const UserCardBodyFront = ({ name, emailId, picture, id }) => {
  return (
    <React.Fragment>
      <UserThumbnail image={picture.large} id={id} />
      <UserDetailsPrimary
        username={name}
        emailId={emailId}
        dob="20-04-2000"
        gender="Male"
      />
    </React.Fragment>
  );
};

const UserCardBodyBack = ({ emailId, cell, phone }) => {
  return (
    <UserDetailsContact emailAddress={emailId} cell={cell} phone={phone} />
  );
};

const UserThumbnail = ({ id, image }) => {
  const { setSelectedUserId } = useContext(UserContext);

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

const UserTileCard = ({ front, user }) => {
  const { name, id } = user;
  const cardClass = front ? "front" : "back";
  const bodyContent = front ? (
    <UserCardBodyFront {...user} />
  ) : (
    <UserCardBodyBack {...user} />
  );

  return (
    <div className={cardClass}>
      <Card className="border-0 box-shadow">
        <UserCardHeader fname={name} lname={name} id={id} />
        <CardBody>
          <UserCardBody truncate={front}>{bodyContent}</UserCardBody>
        </CardBody>
      </Card>
    </div>
  );
};

const UserTile = ({ user }) => {
  const { selectedUserId } = useContext(UserContext);
  let contentCls = "content";
  if (selectedUserId === user.id) {
    contentCls += " flipped";
  }
  return (
    <div className="col-xl-4 col-lg-6 mb-4">
      <div className="flip">
        <div className={contentCls}>
          <UserTileCard front={true} user={user} />
          <UserTileCard front={false} user={user} />
        </div>
      </div>
    </div>
  );
};

const UsersList = () => {
  const { users } = useContext(UserContext);

  return (
    <div className="row">
      {users.length > 0 &&
        users.map((user) => <UserTile key={user.id} user={user} />)}
    </div>
  );
};

export default UsersList;

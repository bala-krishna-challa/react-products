// import React, { useEffect, useState, useContext } from "react";
// import { FaBars, FaTimes, FaUser } from "react-icons/fa";
// import { TOKEN } from "../constants";
// import Register from "../Register/Register";

// const Card = (props) => {
//   const classes = "card " + props.className;
//   return <div className={classes}>{props.children}</div>;
// };

// const CardHeader = (props) => {
//   const classes = "card-header " + props.className;
//   return <div className={classes}>{props.children}</div>;
// };

// const CardBody = (props) => <div className="card-body">{props.children}</div>;

// const UserHeaderAction = ({ id, selectedUserId }) => {
//   let action =
//     selectedUserId === id ? (
//       <FaTimes
//         className="icon"
//         role="button"
//         onClick={() => setSelectedUserId(null)}
//       />
//     ) : (
//       <FaBars
//         className="icon"
//         role="button"
//         onClick={() => setSelectedUserId(id)}
//       />
//     );
//   return action;
// };

// const UserHeader = ({ name }) => {
//   return (
//     <h5 className="user-card-header">
//       <FaUser className="icon icon-user" />
//       <span>{name}</span>
//     </h5>
//   );
// };

// const UserCardHeader = ({ id, selectedUserId, fname, lname }) => (
//   <CardHeader className="border-0">
//     <UserHeader name={fname + " " + lname} />
//     <UserHeaderAction id={id} selectedUserId={selectedUserId} />
//   </CardHeader>
// );

// const UserCardBody = (props) => {
//   const classes = props.truncate
//     ? "user-card-body text-truncate"
//     : "user-card-body";
//   return <div className={classes}>{props.children}</div>;
// };

// const UserCardBodyFront = (props) => {
//   return (
//     <React.Fragment>
//       <UserThumbnail image={props.picture.large} id={props.id} />
//       <UserDetailsPrimary
//         username={props.name}
//         email={props.email}
//         dob="20-04-2000"
//         gender="Male"
//       />
//     </React.Fragment>
//   );
// };

// const UserCardBodyBack = (props) => {
//   return (
//     <UserDetailsContact
//       emailAddress={props.emailId}
//       cell={props.cell}
//       phone={props.phone}
//     />
//   );
// };

// const UserThumbnail = (props) => {
//   const { selectedUser, resetSelectedUser } = useContext(SelectedUserContext);
//   const idToSelect =
//     selectedUser && selectedUser.id === props.id ? null : props.id;

//   return (
//     <div className="user-thumbnail">
//       <img
//         onClick={() => resetSelectedUser(idToSelect)}
//         alt="User thumbnail"
//         role="button"
//         src={props.image}
//       />
//     </div>
//   );
// };

// const UserField = (props) => {
//   let valClasses = "col-8 user-field-value";
//   if (props.truncate) {
//     valClasses += " text-truncate";
//   }
//   return props.value ? (
//     <React.Fragment>
//       <div className="col-4 user-field">{props.field}:</div>
//       <div className={valClasses}>{props.value}</div>
//     </React.Fragment>
//   ) : null;
// };

// const UserDetailsPrimary = (props) => {
//   return (
//     <div className="user-details">
//       <div className="row">
//         {Object.keys(props).map((key) => (
//           <UserField key={key} field={key} value={props[key]} truncate={true} />
//         ))}
//       </div>
//     </div>
//   );
// };

// const UserDetailsContact = (props) => {
//   return (
//     <div className="user-details">
//       <div className="row">
//         {Object.keys(props).map((key) => (
//           <UserField key={key} field={key} value={props[key]} />
//         ))}
//       </div>
//     </div>
//   );
// };

// const UserTileCard = (props) => {
//   const cardClass = props.front ? "front" : "back";
//   const bodyContent = props.front ? (
//     <UserCardBodyFront {...props} />
//   ) : (
//     <UserCardBodyBack {...props} />
//   );

//   return (
//     <div className={cardClass}>
//       <Card className="border-0 box-shadow">
//         <UserCardHeader fname={props.name} lname={props.name} id={props.id} />
//         <CardBody>
//           <UserCardBody truncate={props.front}>{bodyContent}</UserCardBody>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// const UserTile = ({ user, selectedUserId, setSelectedUserId }) => {
//   let contentCls = "content";
//   if (selectedUserId === user.id) {
//     contentCls += " flipped";
//   }
//   return (
//     <div className="col-xl-4 col-lg-6 mb-4">
//       <div className="flip">
//         <div className={contentCls}>
//           <UserTileCard
//             front={true}
//             setSelectedUserId={setSelectedUserId}
//             {...user}
//           />
//           <UserTileCard
//             front={false}
//             setSelectedUserId={setSelectedUserId}
//             {...user}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState(null);

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/users", {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem(TOKEN)}`,
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await response.json();

//       if (data.status.toString().startsWith("2")) {
//         setUsers(data.body.users);
//       } else {
//         console.log("error", data.body.message);
//       }

//       console.log("data", data);
//     } catch (err) {
//       console.log("error", err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const resetSelectedUser = (id) => {
//     let user = null;
//     if (id) {
//       user = users.find((u) => u.id === id);
//     }
//     setSelectedUserId(id);
//   };

//   return (
//     <div>
//       <Register onUserCreation={fetchUsers} />
//       <div className="main-content">
//         <h3 className="header">Platform Users</h3>
//         <div className="row">
//           {users.length > 0 &&
//             users.map((user) => (
//               <UserTile
//                 key={user.id}
//                 user={user}
//                 selectedUserId={selectedUserId}
//                 setSelectedUserId={setSelectedUserId}
//               />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Users;

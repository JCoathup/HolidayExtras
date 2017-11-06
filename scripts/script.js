let users = []; // empty array to store collection of user objects
let flag; // checks whether we are creating a new record or editing an exisitng one

function userEntry(){ //displays user records
    results.innerHTML += `<ul id="resultHeader">
                          <li>First Name</li>
                          <li>Last Name</li>
                          <li>Username</li>
                          <li>Email</li>
                          <li>Record Created</li>
                          </ul>`
  for (let i=0; i<users.length; i++){
    results.innerHTML += `<ul id=${i}>
                          <li>${users[i].firstname}</li>
                          <li>${users[i].lastname}</li>
                          <li>${users[i].username}</li>
                          <li>${users[i].email}</li>
                          <li>${users[i].timeStamp}</li>
                          <li class="control"><button class="editUser">Edit</button></li>
                          <li class="control"><button class="deleteUser">Delete</button></li>
                          </ul>`;
  }
}

// one event delegator to handle all click events on the page
document.addEventListener("click", function(e){

  function uniqueUsername (){
    for (let user of users){
      if (userName.value == user.username){
        userName.value = "DUPLICATE";
      }
    }
  }

  const user = {}

  // template literal to create user details form
  const userForm = `<form name="frm" id="frm">
                    <h1>Create User</h1>
                    <label for="first">First Name</label>
                    <input id="first" type = "text" placeholder="First Name" name="first" required />
                    <label for="last">Last Name</label>
                    <input id="last" type = "text" placeholder="Last Name" required />
                    <label for="userName">Userame</label>
                    <input id="userName" type="text"  placeholder="Username" required />
                    <label for="email">Email</label>
                    <input id="email" type = "text" placeholder="Email" required />
                    <button type="submit" id="create">Save User</button>
                    </form>`;

  const results = document.getElementById("results");
  const first = document.getElementById("first");
  const last = document.getElementById("last");
  const userName = document.getElementById("userName");
  const email = document.getElementById("email");

  //add a user record
  if (e.target && e.target.id == "addUser"){
    results.innerHTML = userForm;
    flag=false;
  }
  //submit the user record
  if (e.target && e.target.id == "create"){
    uniqueUsername();
    user.firstname = first.value;
    user.lastname = last.value;
    user.username = userName.value;
    user.email = email.value;
    if (flag){ // are we creating a new record or editing an existing one?
      users[flag].firstname = first.value;
      users[flag].lastname = last.value;
      users[flag].username = userName.value;
      users[flag].email = email.value;
      if (userName.value == 'DUPLICATE'){
        users.pop(user);
        alert("Username already taken. Please re-enter record");
      }
    }
    else { //generate timeStamp for new record
      let now = new Date();
      let date = now.toDateString();
      let time = now.toLocaleTimeString();
      user.timeStamp = date + " " + time;
      users.push(user);
      //test for unique username
      if (userName.value == 'DUPLICATE'){
        users.pop(user);
        alert("Username already taken. Please re-enter record");
      }
    }
    results.innerHTML = " ";
    userEntry();
  }
  //delete user record
  if (e.target && e.target.className == "deleteUser"){
    let deleteUser = document.querySelectorAll(".deleteUser");
    users.splice(e.target.parentNode.parentNode.id, 1);
    results.innerHTML = " ";
    userEntry();
  }
  //edit user record
  if (e.target && e.target.className == "editUser"){
    results.innerHTML = " ";
    results.innerHTML = userForm;
    document.frm.first.value = users[(e.target.parentNode).parentNode.id].firstname;
    document.frm.last.value = users[(e.target.parentNode).parentNode.id].lastname;
    document.frm.userName.value = users[(e.target.parentNode).parentNode.id].username;
    document.frm.email.value = users[(e.target.parentNode).parentNode.id].email;
    flag = (e.target.parentNode).parentNode.id;
  }
})

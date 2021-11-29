const socket = io('ws://localhost:8080');

socket.on('message', text => {

    const li = document.createElement('li');
    li.innerHTML = text;
    document.querySelector('ul').appendChild(el)

});

document.querySelector('button').onclick = () => {

    const text = document.querySelector('input').value;
    socket.emit('message', text)
    
}

// class for sender
class user {
  constructor(firstName, lastName, profilpicture, userID) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.profilpicture = profilpicture;
    this.userID = userID;
  }
  getDetails() {
    return this.profilpicture + " " + this.userID + " " + this.firstName + " " + this.lastName;
  }
}
// class for message
class message extends user {
  constructor(firstName, lastName,input, time) {
    super(firstName,lastName);
    this.input = input;
    this.time = time;
  }
  
  // Function for the time stamp
  getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
      hours = "0" + hours;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    let time = hours + ":" + minutes;
    return time;
  }

  //Function for message input
  getInput() {
    return this.firstName + this.lastName + this.getTime() + this.input;
  }
}

//class for chat
class chat extends message {
  constructor(input, time, history, chatID) {
    super(input, time);
    this.history = history;
    this.chatID = chatID;
  }
  //create chat
  putChat() {
    return this.getInput() + this.history + this.chatID;
  }
}


// class for Two Person Chat
class twoPersonChat extends chat, user {
  constructor(firstName, lastName, profilpicture, userID, input, time, history, chatID, status) {
    super(firstName, lastName, profilpicture, userID,input, time, history, chatID);
    this.status = status;
  }
  //create twoPersonChat
  puttwoPersonChat (){
return this.getDetails() + this.getChat() + this.status;
  }
}


// class for Groupchat
class groupChat extends chat {
  constructor(input, time, history, chatID, groupName, groupImage){
    super(input, time, history, chatID)
    this.groupName = groupName;
    this.groupImage = groupImage;
  }
  //create groupChat 
  putgroupChat(){
   return this.getChat() + this.groupName + this.groupImage
  }
}
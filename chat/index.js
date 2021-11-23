// class for sender
class sender {
    constructor(firstName, lastName,profilpicture, input) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.profilpicture = profilpicture
      this.input = input;
    }
    details() 
    { return this.firstName + " " + this.lastName;
    }
    fullname() {
      return this.firstName + this.lastName;
    }
  }

    // class for receiver
  class receiver {
    constructor(firstName, lastName,profilpicture, input) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.profilpicture = profilpicture
      this.input = input;
    }
    details() 
    { return this.firstName + " " + this.lastName;
    }
    fullname() {
      return this.firstName + this.lastName;
    }
  }

     // class for message
     class message{
      constructor(userName, messageId, timeStamp, input) {
        this.userName = userName;
        this.messageId = messageId;
        this.timeStamp = timeStamp
        this.input = input;
      }
      directmessage() 
      { return this.username + " : " + this.input + " " + this.timeStamp;
      }
      
    }
  


  // Function for the time stamp

  function getTime() {
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


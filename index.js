class user1 {
    constructor(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.input = input;
    }
    details() 
    { return this.firstName + " " + this.lastName;
    }
    fullname() {
      return this.firstName + this.lastName;
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


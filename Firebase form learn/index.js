const firebaseConfig = {
    apiKey: "AIzaSyB0qGHX3XeiaJZwFfSx69Rf7soLPueRXpY",
    authDomain: "signup-form-50825.firebaseapp.com",
    projectId: "signup-form-50825",
    storageBucket: "signup-form-50825.appspot.com",
    messagingSenderId: "953217679956",
    appId: "1:953217679956:web:c22d4d8ce991c3d046e3c1"
  };

  // Initialize Firebase
    const app = initializeApp(firebaseConfig);

  // Initialize variables
  const auth = app.auth();
  const database = app.database();

  // set up
  function register () {
    firstname = document.getElementById('firstname').value;
    surname = document.getElementById('surname').value;
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    con_password = document.getElementById('con_password').value;
    check = document.getElementById('check').value;

    // validate inputs
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Your Email or Password is outta line');
        return
    }

    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
        var user = auth.currentUser

        var database_ref = database.ref()

        var user_data = {
            firstname : firstname,
            surname : surname,
            email : email,
            password : password,
            con_password : con_password,
            check : check,
            last_login : Date.now()
        }

        database_ref.child('users/' + user.uid).set(user_data)

        alert('You have succesfully Signed up for Camhire')
    })
    .catch(function(error) {
        var error_code = error.code
        var error_message = error.message

        alert(error_message)
    })

  }

  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        return true
    }else {
        return false
    }
  }


  function validate_password(password) {
    if (password < 6) {
      return false
    } else {
      return true
    }
  }

  function validate_field(field) {
    if(field.length <= 0) {
        return false
      } else {
        return true
      }
  }

  function validate_conPassword(con_password) {
    if (con_password == password) {
        return true
    } else {
        return false
    }
  }

  function validate_check(check) {
    if (check == true) {
        return true
    } else {
        return false
    }
  }
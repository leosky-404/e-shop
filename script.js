function changeView() {
    const signUpBox = document.getElementById('signUpBox');
    const signInBox = document.getElementById('signInBox');

    signUpBox.classList.toggle('d-none');
    signInBox.classList.toggle('d-none');
}

function signUp() {
    const fName = document.getElementById('fName').value;
    const lName = document.getElementById('lName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const mobile = document.getElementById('mobile').value;
    const gender = document.getElementById('gender').value;

    const formData = new FormData();
    formData.append('fName', fName);
    formData.append('lName', lName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('mobile', mobile);
    formData.append('gender', gender);

    const xhRequest = new XMLHttpRequest();

    xhRequest.onreadystatechange = function() {
        if (xhRequest.readyState === 4 && xhRequest.status === 200) {
            const responseText = xhRequest.responseText;

            if (responseText === 'success') {
                document.getElementById('msg').innerHTML = responseText;
                document.getElementById('msg').className = 'alert alert-success';
                document.getElementById('msgdiv').className = 'd-block';
            } else {
                document.getElementById('msg').innerHTML = responseText;
                document.getElementById('msgdiv').className = 'd-block';
            }
        }
    }
    
    xhRequest.open('POST', 'signUp.php', true);
    xhRequest.send(formData);
}

function signIn() {
    const email = document.getElementById('email2').value;
    const password = document.getElementById('password2').value;
    const rememberme = document.getElementById('rememberme').checked;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('rememberme', rememberme);

    const xhRequest = new XMLHttpRequest();

    xhRequest.onreadystatechange = function() {
        if (xhRequest.readyState === 4 && xhRequest.status === 200) {
            const responseText = xhRequest.responseText;

            if (responseText === 'success') {
                window.location = './home.php';
            } else {
                alert(responseText);
            }
        }
    }

    xhRequest.open('POST', './signIn.php', true);
    xhRequest.send(formData);
}

function forgotPassword() {
    const email = document.getElementById('email2').value;
    const xhRequest = new XMLHttpRequest();
    
    xhRequest.onreadystatechange = function() {
        if (xhRequest.readyState === 4 && xhRequest.status === 200) {
            const responseText = xhRequest.responseText;

            if (responseText === 'success') {
                const message = document.getElementById('forgotPasswordModal');
                const bootstrapModal = new bootstrap.Modal(message);
                bootstrapModal.show();  
            }  else {
                alert(responseText);
            }
        }
    }

    xhRequest.open('POST', './forgotPassword.php?email=' + email, true);
    xhRequest.send();
}

function resetPassword() {
    const email = document.getElementById('email2').value;
    const newPassword = document.getElementById('np').value;
    const reEnteredPassword = document.getElementById('rnp').value;
    const verificationCode = document.getElementById('vc').value;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('newPassword', newPassword);
    formData.append('reEnteredPassword', reEnteredPassword);
    formData.append('verificationCode', verificationCode);

    const xhRequest = new XMLHttpRequest();

    xhRequest.onreadystatechange = function() {
        if (xhRequest.readyState === 4 && xhRequest.status === 200) {
            const responseText = xhRequest.responseText;

            if (responseText === 'success') {
                bootstrapModal.hide();
                alert('Your password has been updated successfully.');
                window.location.reload();
            } else {
                alert(responseText);
            }
        }
    }

    xhRequest.open('POST', './resetPassword.php', true);
    xhRequest.send(formData);
}

function signOut() {
    const xhRequest = new XMLHttpRequest();

    xhRequest.onreadystatechange = function() {
        if (xhRequest.readyState === 4 && xhRequest.status === 200) {
            const responseText = xhRequest.responseText;

            if (responseText === 'success') {
                window.location = './index.php';
            } else {
                alert(responseText);
            }
        }
    }

    xhRequest.open('POST', './signOut.php', true);
    xhRequest.send();
}

function showPassword() {
    const newPassword = document.getElementById('np');
    const newPasswordButton = document.getElementById('npb');

    if (newPassword.type === 'password') {
        newPassword.type = 'text';
        newPasswordButton.innerHTML = '<i class="bi bi-eye-slash-fill"></i>';
    } else {
        newPassword.type = 'password';
        newPasswordButton.innerHTML = '<i class="bi bi-eye"></i>';
    }
}

function showPassword2() {
    const reEnteredPassword = document.getElementById('rnp');
    const reEnteredPasswordButton = document.getElementById('rnpb');

    if (reEnteredPassword.type === 'password') {
        reEnteredPassword.type = 'text';
        reEnteredPasswordButton.innerHTML = '<i class="bi bi-eye-slash-fill"></i>';
    } else {
        reEnteredPassword.type = 'password';
        reEnteredPasswordButton.innerHTML = '<i class="bi bi-eye"></i>';
    }
}

function showPassword3() {
    const password = document.getElementById('pw');
    const passwordButton = document.getElementById('pwb');

    if (password.type === 'password') {
        password.type = 'text';
        passwordButton.innerHTML = '<i class="bi bi-eye-slash-fill"></i>';
    } else {
        password.type = 'password';
        passwordButton.innerHTML = '<i class="bi bi-eye-fill"></i>';
    }
}
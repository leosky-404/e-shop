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

    xhRequest.onreadystatechange = function () {
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

    xhRequest.onreadystatechange = function () {
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

function signOut() {
    const xhRequest = new XMLHttpRequest();

    xhRequest.onreadystatechange = function () {
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

function forgotPassword() {
    const email = document.getElementById('email2').value;
    const xhRequest = new XMLHttpRequest();

    xhRequest.onreadystatechange = function () {
        if (xhRequest.readyState === 4 && xhRequest.status === 200) {
            const responseText = xhRequest.responseText;

            if (responseText === 'success') {
                const message = document.getElementById('forgotPasswordModal');
                const bootstrapModal = new bootstrap.Modal(message);
                bootstrapModal.show();
            } else {
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

    xhRequest.onreadystatechange = function () {
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

function updateProfile() {
    const profileImage = document.getElementById('profileImage').files[0];
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;
    const mobileNumber = document.getElementById('mobile').value;
    const password = document.getElementById('pw').value;
    const emailAddress = document.getElementById('email').value;
    const addressLine1 = document.getElementById('line1').value;
    const addressLine2 = document.getElementById('line2').value;
    const province = document.getElementById('province').value;
    const district = document.getElementById('district').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('pc').value;

    const formData = new FormData();
    formData.append('profileImage', profileImage);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('mobileNumber', mobileNumber);
    formData.append('password', password);
    formData.append('emailAddress', emailAddress);
    formData.append('addressLine1', addressLine1);
    formData.append('addressLine2', addressLine2);
    formData.append('province', province);
    formData.append('district', district);
    formData.append('city', city);
    formData.append('postalCode', postalCode);

    const xhRequest = new XMLHttpRequest();

    xhRequest.onreadystatechange = function () {
        if (xhRequest.status === 200 && xhRequest.readyState === 4) {
            const responseText = xhRequest.responseText;

            if (responseText === 'success') {
                signOut();
            } else {
                alert(responseText);
            }
        }
    }

    xhRequest.open('POST', './updateProfile.php', true);
    xhRequest.send(formData);
}

function loadBrands() {
    const category = document.getElementById('category').value;
    const xhRequest = new XMLHttpRequest();

    xhRequest.onreadystatechange = function () {
        if (xhRequest.readyState === 4 && xhRequest.status === 200) {
            const responseText = xhRequest.responseText;
            document.getElementById('brand').innerHTML = responseText;
        }
    }

    xhRequest.open('GET', './loadBrands.php?category=' + category, true);
    xhRequest.send();
}

function changeProductImage() {
    const images = document.getElementById('imageuploader');

    images.onchange = function () {
        const fileCount = images.files.length;

        if (fileCount <= 3) {
            for (let x = 0; x < fileCount; x++) {
                const file = this.files[x];
                const url = window.URL.createObjectURL(file);
                document.getElementById("i" + x).src = url;
            }
        } else {
            alert(fileCount + ' images selected. Please select only 3 images.')
        }
    }
}

function addProduct() {
    const category = document.getElementById('category').value;
    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const title = document.getElementById('title').value;

    let condition = 0;

    if (document.getElementById('b').checked) {
        condition = 1;
    } else if (document.getElementById('u').checked) {
        condition = 2;
    }

    const color = document.getElementById('clr').value;
    const quantity = document.getElementById('qty').value;
    const cost = document.getElementById('cost').value;
    const daysWithinCountry = document.getElementById('dwc').value;
    const daysOutsideCountry = document.getElementById('doc').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('imageuploader').files;

    const formData = new FormData();
    formData.append('ca', category);
    formData.append('b', brand);
    formData.append('m', model);
    formData.append('t', title);
    formData.append('con', condition);
    formData.append('col', color);
    formData.append('qty', quantity);
    formData.append('cost', cost);
    formData.append('dwc', daysWithinCountry);
    formData.append('doc', daysOutsideCountry);
    formData.append('des', description);

    const fileCount = image.length;

    for (let x = 0; x < fileCount; x++) {
        formData.append('img', image[x]);
    }

    const xhRequest = new XMLHttpRequest();

    xhRequest.onreadystatechange = function () {
        if (xhRequest.readyState === 4 && xhRequest.status === 200) {
            const responseText = xhRequest.responseText;

            if (responseText === 'success') {
                window.location = './home.php';
            } else {
                alert(responseText);
            }
        }
    }

    xhRequest.open('POST', './addProductProcess.php', true);
    xhRequest.send(formData);
}

function changeStatus(id) {
    const productId = id;
    const xhRequest = new XMLHttpRequest();

    xhRequest.onreadystatechange = function () {
        if (xhRequest.status === 200 && xhRequest.readyState === 4) {
            const responseText = xhRequest.responseText;

            if (responseText === 'activated' || responseText === 'deactivated') {
                window.location.reload();
            } else {
                alert(responseText);
            }
        }
    }

    xhRequest.open('GET', './changeStatus.php?id=' + productId, true);
    xhRequest.send();
}

function sort(x) {
    const search = document.getElementById('search').value;
    let time = '0';

    if (document.getElementById('n').checked) {
        time = '1';
    } else if (document.getElementById('o').checked) {
        time = '2';
    }

    let quantity = '0';

    if (document.getElementById('h').checked) {
        quantity = '1';
    } else if (document.getElementById('l').checked) {
        quantity = '2';
    }

    let condition = '0';

    if (document.getElementById("b").checked) {
        condition = "1";
    } else if (document.getElementById("u").checked) {
        condition = "2";
    }

    const formData = new FormData();
    formData.append('s', search);
    formData.append('t', time);
    formData.append('q', quantity);
    formData.append('c', condition);
    formData.append('page', x);

    const xhRequest = new XMLHttpRequest();

    xhRequest.onreadystatechange = function () {
        if (xhRequest.readyState === 4 && xhRequest.status === 200) {
            const responseText = xhRequest.responseText;
            document.getElementById('sort').innerHTML = responseText;
        }
    }

    xhRequest.open('POST', './sort.php', true);
    xhRequest.send(formData);
}

function clearSort() {
    window.location.reload();
}

function sendId(id) {
    const xhRequest = new XMLHttpRequest();

    xhRequest.onreadystatechange = function () {
        if (xhRequest.readyState === 4 && xhRequest.status === 200) {
            const responseText = xhRequest.responseText;

            if (responseText === 'success') {
                window.location = './updateProduct.php';
            } else {
                alert(responseText);
            }
        }
    }

    xhRequest.open('GET', './sendId.php?id=' + id, true);
    xhRequest.send();
}

function updateProduct() {
    const title = document.getElementById('t').value;
    const quantity = document.getElementById('q').value;
    const durationWithinCountry = document.getElementById('dwc').value;
    const durationOutsideCountry = document.getElementById('doc').value;
    const description = document.getElementById('d').value;
    const image = document.getElementById('imageuploader').files;

    const formData = new FormData();
    formData.append('t', title);
    formData.append('q', quantity);
    formData.append('dwc', durationWithinCountry);
    formData.append('doc', durationOutsideCountry);
    formData.append('d', description);

    const fileCount = image.length;
    for (let x = 0; x < fileCount; x++) {
        formData.append('img', image[x]);
    }

    const xhRequest = new XMLHttpRequest();

    xhRequest.onreadystatechange = function () {
        if (xhRequest.readyState === 4 && xhRequest.status === 200) {
            const responseText = xhRequest.responseText;
            
            if (responseText === 'success') {
                window.location = './myProducts.php';
            } else if (responseText === 'Invalid Image Count') {
                if (confirm('Don\'t you want to change product images?')) {
                    window.location = './myProducts.php';
                } else {
                    alert('Please select product images.');
                }
            } else {
                alert(responseText);
            }
        }
    }

    xhRequest.open('POST', './updateProduct.php', true);
    xhRequest.send(formData);
}

function basicSearch(x) {
    const text = document.getElementById('kw').value;
    const select = document.getElementById('c').value;

    const formData = new FormData();
    formData.append('t', text);
    formData.append('s', select);
    formData.append('page', x);

    const xhRequest = new XMLHttpRequest();

    xhRequest.onreadystatechange = function () {
        if (xhRequest.readyState === 4 && xhRequest.status === 200) {
            const responseText = xhRequest.responseText;
            document.getElementById('basicSearchResult').innerHTML = responseText;
        }
    }

    xhRequest.open('POST', './basicSearch.php', true);
    xhRequest.send(formData);
}

function advancedSearch(x) {
    const text = document.getElementById('t').value;
    const category = document.getElementById('c1').value;
    const brand = document.getElementById('b1').value;
    const model = document.getElementById('m').value;
    const condition = document.getElementById('c2').value;
    const color = document.getElementById('c3').value;
    const form = document.getElementById('pf').value;
    const to = document.getElementById('pt').value;
    const sort = document.getElementById('s').value;

    const formData = new FormData();
    formData.append('t', text);
    formData.append('cat', category);
    formData.append('b', brand);
    formData.append('mo', model);
    formData.append('con', condition);
    formData.append('col', color);
    formData.append('pf', form);
    formData.append('pt', to);
    formData.append('s', sort);
    formData.append('page', x);

    const xhRequest = new XMLHttpRequest();

    xhRequest.onreadystatechange = function () {
        if (xhRequest.readyState === 4 && xhRequest.status === 200) {
            const responseText = xhRequest.responseText;
            document.getElementById('view_area').innerHTML = responseText;
        }
    }

    xhRequest.open('POST', './advancedSearch.php', true);
    xhRequest.send(formData);
}

function changeMainImage(id) {
    const newImage = document.getElementById('product_img' + id).src;
    const mainImage = document.getElementById('mainImg');

    mainImage.style.backgroundImage = "url(" + newImage + ")";
} 

function quantityIncrease(quantity) {
    const input = document.getElementById('qty_input');

    if (input.value < quantity) {
        const newValue = parseInt(input.value) + 1;
        input.value = newValue;
    } else {
        alert('You have reached to the maximum');
        input.value = quantity;
    }
}

function quantityDecrease() {
    const input = document.getElementById('qty_input');

    if (input.value > 1) {
        const newValue = parseInt(input.value) - 1;
        input.value = newValue;
    } else {
        alert('You have reached to the minimum');
        input.value = 1;
    }
}

function checkValue(quantity) {
    const input = document.getElementById('qty_input');

    if (input.value < 1) {
        alert('You must add 1 or more');
        input.value = 1;
    } else if (input.value > quantity) {
        alert('Insufficieant quantity');
        input.value = quantity;
    }
}


function addToWatchlist(id) {
    const xhRequest = new XMLHttpRequest();

    xhRequest.onreadystatechange = function () {
        if (xhRequest.status === 200 && xhRequest.readyState === 4) {
            const responseText = xhRequest.responseText;

            if (responseText === 'Added') {
                alert('Product added to the watchlist successfully.');
                window.location.reload();
            } else if (responseText === 'Removed') {
                alert('Product removed from watchlist successfully.');
                window.location.reload();
            } else {
                alert(responseText);
            }
        }
    }

    xhRequest.open('GET', './addToWatchList.php?id=' + id, true);
    xhRequest.send();
}

function removeFromWatchlist(id) {
    const xhRequest = new XMLHttpRequest();

    xhRequest.onreadystatechange = function () {
        if (xhRequest.status === 200 && xhRequest.readyState === 4) {
            const responseText = xhRequest.responseText;

            if (responseText === 'Deleted') {
                window.location.reload();
            } else {
                alert(responseText);
            }
        }
    }

    xhRequest.open('GET', './removeFromWatchList.php?id=' + id, true);
    xhRequest.send();
}
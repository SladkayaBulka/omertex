function validateEmail(userId) { 
    var emailRegex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegex.test(userId);
};

function validatePhone(userId) { 
    var phoneRegex = /^(\+375)?\d{9}$/; 
    return phoneRegex.test(userId);
};

const getTypeUserId = (userId) => {
    return validateEmail(userId) ? 'email' : (validatePhone(userId) ? 'phone' : false);
};

const comparePassword = (input_pass, db_pass) => {
    return input_pass === db_pass
};




module.exports = {
    getTypeUserId,
    comparePassword,
}



/**
 * Validates the email address format.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email format is valid, false otherwise.
 */
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates the password complexity.
 * @param {string} password - The password to validate.
 * @returns {string[]} - Returns an array of error messages. If empty, the password is valid.
 */
export const validatePassword = (password) => {
    const errors = [];
    if (!/[a-z]/.test(password)) {
        errors.push("at least 1 lowercase letter");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("at least 1 uppercase letter");
    }
    if (!/\d/.test(password)) {
        errors.push("at least 1 number");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("at least 1 special character");
    }
    if (password.length < 8) {
        errors.push("minimum 8 characters");
    }
    return errors;
};

/**
 * Validates a contact name.
 * @param {string} name - The name to validate.
 * @returns {string|null} - Returns an error message if invalid, otherwise null.
 */
export const validateContactName = (name) => {
    const cleanedName = name.trim();
    if (!/[A-Za-z]/.test(cleanedName)) {
        return "Name must contain at least one letter";
    }
    if (!/^[A-Za-z\s'-]+$/.test(cleanedName)) {
        return "Name contains invalid characters";
    }
    if (cleanedName.length < 2 || cleanedName.length > 50) {
        return "Name must be between 2 and 50 characters";
    }
    return null;
};

/**
 * Validates a phone number.
 * @param {string} phone - The phone number to validate.
 * @returns {boolean} - Returns true if the phone number format is valid (10-15 digits), false otherwise.
 */
export const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone);
};

// Form validation without regular expressions
// Validation 1: Full Name - must be at least 3 characters and contain only letters and spaces
// Validation 2: Email - must contain @ and . with proper structure
// Validation 3: Phone - must be at least 10 digits (allowing spaces, dashes, parentheses)
// Validation 4: Dropdown selections - must be selected
// Validation 5: Message - must be at least 20 characters

const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// Validation 1: Name Validation (no regex)
function validateName(name) {
    if (name.length < 3) {
        return 'Name must be at least 3 characters long';
    }
    
    // Check if name contains only letters, spaces, and hyphens
    for (let i = 0; i < name.length; i++) {
        const char = name[i];
        const isLetter = (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
        const isSpace = char === ' ';
        const isHyphen = char === '-';
        
        if (!isLetter && !isSpace && !isHyphen) {
            return 'Name can only contain letters, spaces, and hyphens';
        }
    }
    
    // Check if name has at least one letter
    let hasLetter = false;
    for (let i = 0; i < name.length; i++) {
        const char = name[i];
        if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
            hasLetter = true;
            break;
        }
    }
    
    if (!hasLetter) {
        return 'Name must contain at least one letter';
    }
    
    return '';
}

// Validation 2: Email Validation (no regex)
function validateEmail(email) {
    if (email.length === 0) {
        return 'Email is required';
    }
    
    // Check for @ symbol
    let atIndex = -1;
    let atCount = 0;
    for (let i = 0; i < email.length; i++) {
        if (email[i] === '@') {
            atIndex = i;
            atCount++;
        }
    }
    
    if (atCount === 0) {
        return 'Email must contain @ symbol';
    }
    
    if (atCount > 1) {
        return 'Email can only contain one @ symbol';
    }
    
    if (atIndex === 0) {
        return 'Email must have characters before @';
    }
    
    if (atIndex === email.length - 1) {
        return 'Email must have domain after @';
    }
    
    // Check for dot after @
    let dotAfterAt = false;
    let lastDotIndex = -1;
    for (let i = atIndex + 1; i < email.length; i++) {
        if (email[i] === '.') {
            dotAfterAt = true;
            lastDotIndex = i;
        }
    }
    
    if (!dotAfterAt) {
        return 'Email must contain a dot (.) in domain';
    }
    
    // Check if there are characters after the last dot
    if (lastDotIndex === email.length - 1) {
        return 'Email must have characters after the last dot';
    }
    
    // Check minimum length of domain extension
    if (email.length - lastDotIndex < 3) {
        return 'Email domain extension too short';
    }
    
    return '';
}

// Validation 3: Phone Validation (no regex)
function validatePhone(phone) {
    if (phone.length === 0) {
        return 'Phone number is required';
    }
    
    // Extract only digits
    let digitCount = 0;
    for (let i = 0; i < phone.length; i++) {
        const char = phone[i];
        if (char >= '0' && char <= '9') {
            digitCount++;
        }
    }
    
    if (digitCount < 10) {
        return 'Phone number must contain at least 10 digits';
    }
    
    if (digitCount > 15) {
        return 'Phone number is too long';
    }
    
    // Check for valid characters (digits, spaces, dashes, parentheses, plus)
    for (let i = 0; i < phone.length; i++) {
        const char = phone[i];
        const isDigit = char >= '0' && char <= '9';
        const isValid = isDigit || char === ' ' || char === '-' || char === '(' || char === ')' || char === '+';
        
        if (!isValid) {
            return 'Phone number contains invalid characters';
        }
    }
    
    return '';
}

// Validation 4: Dropdown Validation
function validateDropdown(value, fieldName) {
    if (value === '' || value === null) {
        return fieldName + ' must be selected';
    }
    return '';
}

// Validation 5: Message Validation (no regex)
function validateMessage(message) {
    if (message.length === 0) {
        return 'Message is required';
    }
    
    if (message.length < 20) {
        return 'Message must be at least 20 characters long';
    }
    
    if (message.length > 1000) {
        return 'Message is too long (maximum 1000 characters)';
    }
    
    // Check if message contains at least some meaningful content (not just spaces)
    let nonSpaceCount = 0;
    for (let i = 0; i < message.length; i++) {
        if (message[i] !== ' ' && message[i] !== '\n' && message[i] !== '\t') {
            nonSpaceCount++;
        }
    }
    
    if (nonSpaceCount < 20) {
        return 'Message must contain at least 20 meaningful characters';
    }
    
    return '';
}

// Show error message
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement && inputElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        inputElement.classList.add('error');
    }
}

// Clear error message
function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement && inputElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        inputElement.classList.remove('error');
    }
}

// Real-time validation on input
document.getElementById('fullName').addEventListener('input', function() {
    const error = validateName(this.value.trim());
    if (error) {
        showError('fullName', error);
    } else {
        clearError('fullName');
    }
});

document.getElementById('email').addEventListener('input', function() {
    const error = validateEmail(this.value.trim());
    if (error) {
        showError('email', error);
    } else {
        clearError('email');
    }
});

document.getElementById('phone').addEventListener('input', function() {
    const error = validatePhone(this.value.trim());
    if (error) {
        showError('phone', error);
    } else {
        clearError('phone');
    }
});

document.getElementById('subject').addEventListener('change', function() {
    const error = validateDropdown(this.value, 'Subject');
    if (error) {
        showError('subject', error);
    } else {
        clearError('subject');
    }
});

document.getElementById('country').addEventListener('change', function() {
    const error = validateDropdown(this.value, 'Country');
    if (error) {
        showError('country', error);
    } else {
        clearError('country');
    }
});

document.getElementById('message').addEventListener('input', function() {
    const error = validateMessage(this.value.trim());
    if (error) {
        showError('message', error);
    } else {
        clearError('message');
    }
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value;
    const country = document.getElementById('country').value;
    const message = document.getElementById('message').value.trim();
    const terms = document.getElementById('terms').checked;
    
    // Clear all previous errors
    clearError('fullName');
    clearError('email');
    clearError('phone');
    clearError('subject');
    clearError('country');
    clearError('message');
    clearError('terms');
    
    let isValid = true;
    
    // Validate all fields
    const nameError = validateName(fullName);
    if (nameError) {
        showError('fullName', nameError);
        isValid = false;
    }
    
    const emailError = validateEmail(email);
    if (emailError) {
        showError('email', emailError);
        isValid = false;
    }
    
    const phoneError = validatePhone(phone);
    if (phoneError) {
        showError('phone', phoneError);
        isValid = false;
    }
    
    const subjectError = validateDropdown(subject, 'Subject');
    if (subjectError) {
        showError('subject', subjectError);
        isValid = false;
    }
    
    const countryError = validateDropdown(country, 'Country');
    if (countryError) {
        showError('country', countryError);
        isValid = false;
    }
    
    const messageError = validateMessage(message);
    if (messageError) {
        showError('message', messageError);
        isValid = false;
    }
    
    if (!terms) {
        showError('terms', 'You must agree to the terms of service');
        isValid = false;
    }
    
    // If all validations pass
    if (isValid) {
        // Hide form and show success message
        form.style.display = 'none';
        successMessage.classList.add('show');
        
        // Reset form after 3 seconds
        setTimeout(() => {
            form.reset();
            form.style.display = 'flex';
            successMessage.classList.remove('show');
        }, 5000);
    } else {
        // Scroll to first error
        const firstError = document.querySelector('.error-message.show');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});
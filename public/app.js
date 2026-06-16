/**
 * AISPIRE WAITLIST LANDING PAGE - FRONTEND CONTROLLER
 * Performance Optimized Edition (Zero Runtime Style Inject / Layout Thrash Free)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements Selection
  const waitlistForm = document.getElementById('waitlist-form');
  const emailInput = document.getElementById('email');
  const collegeInput = document.getElementById('college');
  const submitBtn = document.getElementById('submit-btn');
  const inputGroup = emailInput.closest('.input-group');
  const collegeInputGroup = collegeInput.closest('.input-group');
  const errorMessage = document.getElementById('error-message');
  const collegeErrorMessage = document.getElementById('college-error-message');
  
  // Views Selection
  const formContainer = document.getElementById('form-container');
  const successContainer = document.getElementById('success-container');
  const displayEmail = document.getElementById('display-email');
  const displayCollege = document.getElementById('display-college');
  const backBtn = document.getElementById('back-btn');

  // Regex for rigid email verification
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  /**
   * Shows inline input field validation error
   * @param {HTMLElement} group - The input-group container element
   * @param {HTMLElement} msgEl - The error-message element
   * @param {HTMLElement} inputEl - The input element to shake
   * @param {string} message - Specific error instruction to display
   */
  function showError(group, msgEl, inputEl, message) {
    group.classList.add('has-error');
    msgEl.textContent = message;
    msgEl.setAttribute('aria-hidden', 'false');
    msgEl.setAttribute('role', 'alert');

    // Trigger high-performance hardware-accelerated shake animation via class toggles
    inputEl.classList.remove('input-shaking');
    // Force layout recalculation locally via offsetHeight to reset animation timeline
    inputEl.offsetHeight; 
    inputEl.classList.add('input-shaking');
    
    // Clear shake class after animation completes
    setTimeout(() => {
      inputEl.classList.remove('input-shaking');
    }, 400);
  }

  /**
   * Resets active validation errors on a specific input group
   */
  function clearError(group, msgEl) {
    group.classList.remove('has-error');
    msgEl.removeAttribute('role');
    msgEl.setAttribute('aria-hidden', 'true');
  }

  /**
   * Single email verification check
   */
  function validateEmail(value) {
    const trimmedVal = value.trim();
    if (!trimmedVal) {
      showError(inputGroup, errorMessage, emailInput, 'Please enter your email address.');
      return false;
    }
    if (!emailRegex.test(trimmedVal)) {
      showError(inputGroup, errorMessage, emailInput, 'Please enter a valid email address (e.g. name@domain.com).');
      return false;
    }
    clearError(inputGroup, errorMessage);
    return true;
  }

  /**
   * College field validation check
   */
  function validateCollege(value) {
    const trimmedVal = value.trim();
    if (!trimmedVal) {
      showError(collegeInputGroup, collegeErrorMessage, collegeInput, 'Please enter your college name.');
      return false;
    }
    clearError(collegeInputGroup, collegeErrorMessage);
    return true;
  }

  // Live input correction — email
  emailInput.addEventListener('input', () => {
    if (inputGroup.classList.contains('has-error')) {
      const trimmed = emailInput.value.trim();
      if (trimmed && emailRegex.test(trimmed)) {
        clearError(inputGroup, errorMessage);
      }
    }
  });

  // Live input correction — college
  collegeInput.addEventListener('input', () => {
    if (collegeInputGroup.classList.contains('has-error')) {
      const trimmed = collegeInput.value.trim();
      if (trimmed) {
        clearError(collegeInputGroup, collegeErrorMessage);
      }
    }
  });

  // Blur validation — email
  emailInput.addEventListener('blur', () => {
    const val = emailInput.value.trim();
    if (val) {
      validateEmail(val);
    } else {
      clearError(inputGroup, errorMessage);
    }
  });

  // Blur validation — college
  collegeInput.addEventListener('blur', () => {
    const val = collegeInput.value.trim();
    if (!val) {
      validateCollege(val);
    }
  });

  // Form Submit Controller
  waitlistForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailValue = emailInput.value.trim();
    const collegeValue = collegeInput.value.trim();
    
    // Perform final checks before submission
    const emailValid = validateEmail(emailValue);
    const collegeValid = validateCollege(collegeValue);
    
    if (!emailValid || !collegeValid) {
      return;
    }

    // Begin Submission: loading states & controls locking
    submitBtn.classList.add('is-loading');
    submitBtn.setAttribute('aria-busy', 'true');
    emailInput.setAttribute('disabled', 'true');
    collegeInput.setAttribute('disabled', 'true');
    submitBtn.setAttribute('disabled', 'true');

    // Make AJAX POST request to local Node.js server database
    fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: emailValue, college: collegeValue }),
    })
      .then(async (response) => {
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to join waitlist. Please try again.');
        }
        
        // Complete Submission
        submitBtn.classList.remove('is-loading');
        submitBtn.removeAttribute('aria-busy');
        emailInput.removeAttribute('disabled');
        collegeInput.removeAttribute('disabled');
        submitBtn.removeAttribute('disabled');

        // Populate Success screen safely
        displayEmail.textContent = emailValue;
        displayCollege.textContent = collegeValue;

        // Transition to Success Card view
        transitionToSuccess();
      })
      .catch((err) => {
        // Complete Submission
        submitBtn.classList.remove('is-loading');
        submitBtn.removeAttribute('aria-busy');
        emailInput.removeAttribute('disabled');
        collegeInput.removeAttribute('disabled');
        submitBtn.removeAttribute('disabled');
        
        // Display backend error in inline UI
        showError(inputGroup, errorMessage, emailInput, err.message || 'Something went wrong. Please try again.');
      });
  });

  /**
   * Transition views from Form Input to Success screen smoothly
   */
  function transitionToSuccess() {
    // Fade out Form container using composite properties (opacity/transform)
    formContainer.style.opacity = '0';
    formContainer.style.transform = 'translate3d(0, -10px, 0) scale(0.98)';
    
    setTimeout(() => {
      formContainer.style.display = 'none';
      
      // Position Success View
      successContainer.style.display = 'flex';
      successContainer.offsetHeight; // Force layout recalculation
      
      // Animate active state for Success view
      successContainer.classList.add('is-active');
      successContainer.setAttribute('aria-hidden', 'false');
    }, 300);
  }

  /**
   * Transition views from Success screen back to Form Input smoothly
   */
  function transitionToForm() {
    // Fade out Success container
    successContainer.classList.remove('is-active');
    successContainer.setAttribute('aria-hidden', 'true');
    
    setTimeout(() => {
      successContainer.style.display = 'none';
      
      // Position Form view
      formContainer.style.display = 'flex';
      formContainer.offsetHeight;
      
      // Fade in Form container
      formContainer.style.opacity = '1';
      formContainer.style.transform = 'translate3d(0, 0, 0) scale(1)';
      
      // Clear and focus input
      emailInput.value = '';
      collegeInput.value = '';
      emailInput.focus();
    }, 300);
  }

  // Go Back Button Event Listener
  backBtn.addEventListener('click', transitionToForm);
});

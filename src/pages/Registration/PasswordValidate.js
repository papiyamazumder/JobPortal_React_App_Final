import React from 'react';
import './password.css';

const PasswordValidate = ({ password, passwordError, confirmPasswordError, focused }) => {
    const atLeastOneUppercase = /[A-Z]/g;
    const atLeastOneLowercase = /[a-z]/g;
    const atLeastOneNumeric = /[0-9]/g;
    const atLeastOneSpecialChar = /[#?!@$%^&*-]/g;
    const eightCharsOrMore = /.{8,}/g;

    const passwordTracker = {
        uppercase: password.match(atLeastOneUppercase),
        lowercase: password.match(atLeastOneLowercase),
        number: password.match(atLeastOneNumeric),
        specialChar: password.match(atLeastOneSpecialChar),
        eightCharsOrGreater: password.match(eightCharsOrMore),
    };

    const passwordStrength = Object.values(passwordTracker).filter((value) => value).length;

    return (
        <div>
            {focused && (
                <div>
            <div className="password-strength-meter">
            <div className="password-strength-meter-progress" style={{
                    width: `${(passwordStrength / 5) * 100}%`,
                    backgroundColor: ['red', 'orange', '#03a2cc', '#03a2cc', '#0ce052'][passwordStrength - 1] || ''
                }}></div>
            </div>
            {passwordError && (
                <div className="password-validation-messages">
                     {!passwordTracker.eightCharsOrGreater && <p>Password must be at least 8 characters long</p>}
                    {!passwordTracker.uppercase && <p>Must contain at least one uppercase letter</p>}
                    {!passwordTracker.lowercase && <p>Must contain at least one lowercase letter</p>}
                    {!passwordTracker.number && <p>Must contain at least one number</p>}
                    {!passwordTracker.specialChar && <p>Must contain at least one special character (#?!@$%^&*-)</p>}
                </div>
            )}
        </div>
        )}
        </div>
    );
};

export default PasswordValidate;

// this function added to prevent the user from inputting dangerous characters
// like injecting code or executing commands sql

export const inputUserSanitizer = (input) => {
    if(!input) return "";
    const dangerousChars = /[<>""''#?%$&^$;(){}-]/g;
    let sanitized = input.replace(dangerousChars, '');

    sanitized = sanitized.substring(0, 100);

    sanitized = sanitized.trim();

    return sanitized;
};
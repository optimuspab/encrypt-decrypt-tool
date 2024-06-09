window.addEventListener('load', function () {
    initializePage();
});

function initializePage() {
    function encryptAES_ECB(text, key, bits) {
        let keyBytes = CryptoJS.enc.Utf8.parse(key);

        let encrypted = CryptoJS.AES.encrypt(text, keyBytes, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    }

    function decryptAES_ECB(ciphertextHex, key, bits) {
        try {
            let keyBytes = CryptoJS.enc.Utf8.parse(key);
            let ciphertext = CryptoJS.enc.Hex.parse(ciphertextHex);
    
            let decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, keyBytes, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
    
            let decryptedText = CryptoJS.enc.Utf8.stringify(decrypted);
    
            console.log("Decrypted Text:", decryptedText); // Log for debugging
    
            return decryptedText;
        } catch (error) {
            console.error("Decryption Error:", error); // Log any errors
            return "Decryption failed";
        }
    }

    window.encryptForm = function () {
        const textToEncrypt = document.getElementById('text-to-encrypt').value;
        const keySize = document.getElementById('bits-for-encrypt').value;
        const secretKey = document.getElementById('encrypt-secret-key').value;

        const encryptedResult = encryptAES_ECB(textToEncrypt, secretKey, keySize);

        document.getElementById('encrypted-result').value = encryptedResult;
    };

    window.decryptForm = function () {
        const textToDecrypt = document.getElementById('text-to-decrypt').value;
        const keySize = parseInt(document.getElementById('bits-for-decrypt').value);
        const secretKey = document.getElementById('decrypt-secret-key').value;
    
        // Ensure the key length matches the key size
        const key = secretKey.padEnd(keySize / 8, ' ').substring(0, keySize / 8);
    
        console.log("Text to Decrypt:", textToDecrypt);
        console.log("Key Size:", keySize);
        console.log("Secret Key:", secretKey);
        console.log("Processed Key:", key);
    
        const decryptedResult = decryptAES_ECB(textToDecrypt, key, keySize);
        document.getElementById('decrypted-result').value = decryptedResult;
    };   

    window.clearForm = function (formId) {
        const form = document.getElementById(formId);
        form.reset();
    
        if (formId === 'encrypt-form') {
            document.getElementById('encrypted-result').value = '';
        } else if (formId === 'decrypt-form') {
            document.getElementById('decrypted-result').value = '';
        }

    };
    
    window.copyResult = function (resultId) {
        const resultElement = document.getElementById(resultId);
        resultElement.select();
        resultElement.setSelectionRange(0, 99999);
        document.execCommand("copy");
        resultElement.setSelectionRange(0, 0);
        Toastify({

            text: "Result copied to clipboard!",
            
            duration: 3000
            
            }).showToast();
    };

};

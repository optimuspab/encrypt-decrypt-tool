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
        let keyBytes = CryptoJS.enc.Utf8.parse(key);

        let decrypted = CryptoJS.AES.decrypt({
            ciphertext: CryptoJS.enc.Hex.parse(ciphertextHex)
        }, keyBytes, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        return CryptoJS.enc.Utf8.stringify(decrypted);
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
        const keySize = document.getElementById('bits-for-decrypt').value;
        const secretKey = document.getElementById('decrypt-secret-key').value;

        const decryptedResult = decryptAES_ECB(textToDecrypt, secretKey, keySize);

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

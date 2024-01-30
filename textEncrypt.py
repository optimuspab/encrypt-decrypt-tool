from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import padding

def encrypt_aes_ecb(text, key, bits):
    
    data = (text + key).encode('utf-8')

    padder = padding.PKCS7(algorithms.AES.block_size).padder()
    padded_data = padder.update(data) + padder.finalize()

    bits = str(bits)
    if bits == "128":
        key = key.encode('utf-8')[:16]
    elif bits == "192":
        key = key.encode('utf-8')[:24]
    elif bits == "256":
        key = key.encode('utf-8')[:32]
    else:
        print("Error en los bits ingresados, los valores aceptados son: 128, 192 y 256")

    cipher = Cipher(algorithms.AES(key), modes.ECB(), backend=default_backend())

    encryptor = cipher.encryptor()

    ciphertext = encryptor.update(padded_data) + encryptor.finalize()

    return ciphertext.hex()

def decrypt_aes_ecb(ciphertext_hex, key, bits):

    ciphertext = bytes.fromhex(ciphertext_hex)

    bits = str(bits)
    if bits == "128":
        key = key.encode('utf-8')[:16]
    elif bits == "192":
        key = key.encode('utf-8')[:24]
    elif bits == "256":
        key = key.encode('utf-8')[:32]
    else:
        print("Error en los bits ingresados, los valores aceptados son: 128, 192 y 256")

    cipher = Cipher(algorithms.AES(key), modes.ECB(), backend=default_backend())

    decryptor = cipher.decryptor()

    decrypted_data = decryptor.update(ciphertext) + decryptor.finalize()

    unpadder = padding.PKCS7(algorithms.AES.block_size).unpadder()
    data = unpadder.update(decrypted_data) + unpadder.finalize()

    return data.decode('utf-8')


fecha = "2019-06-13 03:00:00"
contrasena = "QEXO?40E8NyQ_1Y?"
bits = 128

ciphertext_hex = encrypt_aes_ecb(fecha, contrasena, bits)
print("Texto encriptado:", ciphertext_hex)

to_decrypt = "5956e6465a60bb909cd7e1ee03b7001bc3665092273263ea0de54043bc06fdb2"
decrypted_text = decrypt_aes_ecb(to_decrypt, contrasena, bits)
print("Texto desencriptado:", decrypted_text)

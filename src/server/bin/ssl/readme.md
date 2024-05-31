Generate the private key
Run the following command for generating the private key : `openssl genrsa -out acme.com.key 2048`

Generate the certificate signing request (CSR)
Create an OpenSSL config file with the following content and named it acme.com.cnf :

[ req ]
default_bits            = 2048
encrypt_key             = no
default_md              = sha256
utf8                    = yes
string_mask             = utf8only
prompt                  = no
distinguished_name = req_distinguished_name
req_extensions     = req_ext

[ req_distinguished_name ]
countryName         = FR
stateOrProvinceName = Ile-de-France
localityName        = PARIS LA DEFENSE
organizationName    = ACME GROUPE
organizationalUnitName = IS Services
commonName          = acme.com

[ req_ext ]
subjectAltName = @alt_names

[alt_names]
DNS.1 = acme.com
DNS.2 = subdomain.acme.com
DNS.3 = another.acme.com

Run the following command for generating the CSR : openssl req -new -sha256 -out acme.com.csr -key acme.com.key -config acme.com.cnf

Verify the certificate signing request (CSR)
You can verify the generated CSR on the CLI using : openssl req -in acme.com.csr -noout -text
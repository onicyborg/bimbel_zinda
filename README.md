## Tutor Instalasi Web (Backend)

- Buka direktori tempat anda ingin menyimpan project, lalu buka git bash
- ketik perintah di bawah

```bash
git clone https://github.com/onicyborg/bimbel_zinda.git
```

- masuk ke folder project dengan mengetik perintah di bawah ini pada terminal

```bash
cd bimbel_zinda
```

- lalu ketik perintah di bawah ini

```bash
composer install
```

atau ketik perintah di bawah ini jika perintah di atas error

```bash
composer update
```

- buka vscode dengan mengetik perintah dibawah ini

```bash
code .
```

- pada vscode, dalam folder project buat file baru dengan nama ".env" lalu copy isi dari file ".env.example" dan paste ke dalam ".env"
- ubah keterangan database sesuai dengan yang di inginkan (DB_DATABASE) dan jangan lupa di save
- lalu jalankan perintah di bawah ini

```bash
php artisan key:generate
```

- lalu ketik perintah

```bash
php artisan migrate
```

```bash
php artisan db:seed UsersSeeders
```

- setelah itu jalankan serve dengan mengetik perintah di bawah ini

```bash
php artisan serve
```

- jika ingin mencoba API lewat postman bisa meng eksport collection di folder project ini yang bernama "Collection.postman_collection.json"

## Tutor Instalasi Web (Frontend)

## Getting Started

### Preparation

Make sure you have installed the following software :

1. [Node.js](https://nodejs.org/)
2. [npm](https://www.npmjs.com/)

### Installation

1. Clone This Repository

   ```bash
   git clone https://github.com/onicyborg/bimbel_zinda.git

   ```

2. Navigate to the folder

   ```bash
   cd bimbel_zinda/frontend

   ```

3. Install depencdencies

   ```bash
   npm install

   ```

4. Run the project
   ```bash
   npm run dev
   ```

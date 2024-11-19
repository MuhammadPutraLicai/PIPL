const Customer = require('./../models/customer-model');
const {Pemasok} = require('./../models/pemasok-model');

class Registration{
    createNewCustomer(customerData) {
        const newCustomerData = {
            nama : customerData['nama'],
            email : customerData['email'],
            nomor_telepon : customerData['nomor_telepon'],
            password : customerData['kata_sandi'],
            bookmark : null
        };

        const newCustomer = new Customer();
        newCustomer.createCustomer(newCustomerData);
    }

    createNewPemasok(pemasokData){
        const newPemasokData = {
            deskripsi : pemasokData['deskripsi'],
            nomor_telepon : pemasokData['nomor_telepon'],
            alamat : pemasokData['alamat'],
            link_logo : "https://placehold.co/600x600",
            jenis_perusahaan : pemasokData['jenis_perusahaan'],
            jenis_produk : pemasokData['jenis_produk'],
            link_website : null,
            email : pemasokData['email'],
            password : pemasokData['password'],
            tahun_diidirikan : "-",
            owner : "-",
            nama_perusahaan : pemasokData['nama_perusahaan'],
            bookmark : null,
            daftar_produk : null
        };

        const newPemasok = new Pemasok();
        newPemasok.createPemasok(newPemasokData);
    }
}

module.exports = Registration;


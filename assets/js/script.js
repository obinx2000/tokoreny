const products = [
    {
        nama: "Beras Kepompong 5kg",
        kategori: "Sembako",
        harga: 69000,
        gambar: "assets/images/products/beras-kepompong-5kg.png",
        status: "Tersedia",
        promo: true
    },
    {
        nama: "Minyak Goreng 2L",
        kategori: "Sembako",
        harga: 35000,
        gambar: "assets/images/products/minyak-2l.jpg",
        status: "Tersedia",
        promo: true
    },
    {
        nama: "Gula Pasir 1kg",
        kategori: "Sembako",
        harga: 17000,
        gambar: "assets/images/products/gula-1kg.jpg",
        status: "Tersedia",
        promo: false
    },
    {
        nama: "Indomie Goreng",
        kategori: "Makanan Instan",
        harga: 3500,
        gambar: "assets/images/products/indomie-goreng.jpg",
        status: "Tersedia",
        promo: false
    },
    {
        nama: "Air Mineral 600ml",
        kategori: "Minuman",
        harga: 4000,
        gambar: "assets/images/products/air-mineral.jpg",
        status: "Tersedia",
        promo: false
    }
];

const produkGrid = document.getElementById("produkGrid");
const filterButtons = document.querySelectorAll(".filter-buttons button");

function tampilkanProduk(daftarProduk) {
    produkGrid.innerHTML = "";

    daftarProduk.forEach(function(product) {
        produkGrid.innerHTML += `
      <div class="produk-card">
        ${product.promo ? '<span class="badge">Murah</span>' : ''}
        <img src="${product.gambar}" alt="${product.nama}">
        <h3>${product.nama}</h3>
        <p>${product.kategori}</p>
        <p class="harga">Rp${product.harga.toLocaleString("id-ID")}</p>
        <p>${product.status}</p>
        <a 
          class="btn-produk"
          href="https://wa.me/6281234567890?text=Saya%20mau%20pesan%20${encodeURIComponent(product.nama)}"
        >
          Pesan
        </a>
      </div>
    `;
    });
}

tampilkanProduk(products);

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const kategori = button.dataset.kategori;

        if (kategori === "Semua") {
            tampilkanProduk(products);
        } else {
            const hasilFilter = products.filter(function(product) {
                return product.kategori === kategori;
            });

            tampilkanProduk(hasilFilter);
        }
    });
});
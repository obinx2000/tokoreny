const products = [
    {
        kode: "BR001",
        nama: "Beras Kepompong 5kg",
        kategori: "Sembako",
        harga: 69000,
        gambar: "assets/images/products/beras-kepompong-5kg.png",
        stok: "Tersedia",
        promo: true
    },
    {
        kode: "MG002",
        nama: "Bimoli 2 Liter",
        kategori: "Sembako",
        harga: 35000,
        gambar: "assets/images/products/minyak-bimoli-2liter.jpg",
        stok: "Tersedia",
        promo: true
    },
    {
        kode: "IM003",
        nama: "Indomie Goreng Original",
        kategori: "Makanan Instan",
        harga: 3500,
        gambar: "assets/images/products/mie-indomie-goreng-original-85gr.jpg",
        stok: "Tersedia",
        promo: false
    },
    {
        kode: "GL004",
        nama: "Gula KTM 1kg",
        kategori: "Sembako",
        harga: 17000,
        gambar: "assets/images/products/gula-ktm-1kg.png",
        stok: "Tersedia",
        promo: false
    },
    {
        kode: "MN001",
        nama: "Teh Pucuk 250 ml",
        kategori: "Minuman",
        harga: 5000,
        gambar: "assets/images/products/teh-pucuk-350ml.jpg",
        stok: "Tersedia",
        promo: true
    }
];

const produkGrid = document.getElementById("produkGrid");
const checkoutButton = document.getElementById("checkoutButton");
const cartCount = document.getElementById("cartCount");
const filterButtons = document.querySelectorAll(".filter-buttons button");

let cart = [];

function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}




function tampilkanProduk(daftarProduk) {
    produkGrid.innerHTML = "";

    daftarProduk.forEach(function(product) {
        produkGrid.innerHTML += `
      <div class="produk-card">
        ${product.promo ? '<span class="badge">Promo</span>' : ''}

        <div class="produk-image-box">
          <img src="${product.gambar}" alt="${product.nama}">
        </div>

        <div class="produk-info">
          <h3 class="produk-name">${product.nama}</h3>
          <p class="produk-category">${product.kategori}</p>
          <p class="produk-price">${formatRupiah(product.harga)}</p>

          <div class="qty-control">
            <button onclick="kurangiJumlah('${product.kode}')">-</button>
            <input 
              type="number" 
              id="qty-${product.kode}" 
              value="1" 
              min="1"
            >
            <button onclick="tambahJumlah('${product.kode}')">+</button>
          </div>

          <button class="btn-cart" onclick="addToCart('${product.kode}')">
            + Keranjang
          </button>
        </div>
      </div>
    `;
    });
}

// ======Fungsi Filter produk=====
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

// ==========================



function tambahJumlah(kodeProduk) {
    const inputJumlah = document.getElementById(`qty-${kodeProduk}`);
    inputJumlah.value = Number(inputJumlah.value) + 1;
}

function kurangiJumlah(kodeProduk) {
    const inputJumlah = document.getElementById(`qty-${kodeProduk}`);

    if (Number(inputJumlah.value) > 1) {
        inputJumlah.value = Number(inputJumlah.value) - 1;
    }
}

function addToCart(kodeProduk) {
    const product = products.find(function(item) {
        return item.kode === kodeProduk;
    });

    const inputJumlah = document.getElementById(`qty-${kodeProduk}`);
    const jumlah = Number(inputJumlah.value);

    const produkDiKeranjang = cart.find(function(item) {
        return item.kode === kodeProduk;
    });

    if (produkDiKeranjang) {
        produkDiKeranjang.jumlah += jumlah;
    } else {
        cart.push({
            kode: product.kode,
            nama: product.nama,
            harga: product.harga,
            jumlah: jumlah
        });
    }

    updateCartCount();

    inputJumlah.value = 1;
}

function updateCartCount() {
    let totalItem = 0;

    cart.forEach(function(item) {
        totalItem += item.jumlah;
    });

    cartCount.textContent = totalItem;
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Keranjang masih kosong.");
        return;
    }

    let pesan = "Halo, saya mau pesan:%0A%0A";
    let totalBelanja = 0;

    cart.forEach(function(item, index) {
        const subtotal = item.harga * item.jumlah;
        totalBelanja += subtotal;

        pesan += `${index + 1}. ${item.kode} - ${item.nama}%0A`;
        pesan += `   ${item.jumlah} x ${formatRupiah(item.harga)} = ${formatRupiah(subtotal)}%0A%0A`;
    });

    pesan += `Total: ${formatRupiah(totalBelanja)}%0A%0A`;
    pesan += "Apakah stok tersedia?";

    const nomorWhatsApp = "6281235432657";
    const urlWhatsApp = `https://wa.me/${nomorWhatsApp}?text=${pesan}`;

    window.open(urlWhatsApp, "_blank");
}

checkoutButton.addEventListener("click", checkoutWhatsApp);

tampilkanProduk();
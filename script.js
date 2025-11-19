// Variabel Global untuk menyimpan data item aktif dan harga
let currentItemPrice = 0;
let currentItemName = "";

/**
 * Fungsi showPage: Untuk navigasi antar halaman (home, menu, about).
 */
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add('active');
    }
    window.scrollTo(0, 0);
}

// Panggil showPage saat DOM content dimuat untuk menampilkan halaman awal
document.addEventListener('DOMContentLoaded', () => {
    // Pastikan halaman 'home' aktif saat pertama kali dimuat
    showPage('home'); 
});


/**
 * Fungsi formatRupiah: Memformat angka menjadi format mata uang Rupiah.
 * @param {number} angka - Angka yang akan diformat.
 */
function formatRupiah(angka) {
    if (typeof angka !== 'number') return 'Rp 0';
    let reverse = angka.toString().split('').reverse().join('');
    let ribuan = reverse.match(/\d{1,3}/g);
    let result = ribuan.join('.').split('').reverse().join('');
    return 'Rp ' + result;
}

/**
 * Fungsi openModal: Menampilkan modal dengan detail item yang dipilih.
 */
function openModal(name, price, desc, imgPath) {
    // Simpan data ke variabel global
    currentItemPrice = price;
    currentItemName = name;

    // Isi konten modal
    document.getElementById('modal-item-name').innerText = name;
    document.getElementById('modal-item-price-display').innerText = formatRupiah(price);
    document.getElementById('modal-item-desc').innerHTML = desc; 
    document.getElementById('modal-item-image').src = imgPath;
    
    // Reset kuantitas ke 1 dan update total
    document.getElementById('item-quantity').value = 1;
    updateTotal();

    // Tampilkan modal
    document.getElementById('itemModal').style.display = 'block';
}

/**
 * Fungsi closeModal: Menyembunyikan modal.
 */
function closeModal() {
    document.getElementById('itemModal').style.display = 'none';
}

/**
 * Fungsi changeQuantity: Mengubah jumlah pesanan dan menghitung ulang total.
 */
function changeQuantity(delta) {
    const qtyInput = document.getElementById('item-quantity');
    let currentQty = parseInt(qtyInput.value);
    let newQty = currentQty + delta;

    // Batasi kuantitas minimal 1
    if (newQty >= 1) {
        qtyInput.value = newQty;
        updateTotal();
    }
}

/**
 * Fungsi updateTotal: Menghitung dan menampilkan total harga.
 */
function updateTotal() {
    const qty = parseInt(document.getElementById('item-quantity').value);
    const total = qty * currentItemPrice;
    document.getElementById('modal-total-price').innerText = formatRupiah(total);
}


function addToCart() {
    const qty = parseInt(document.getElementById('item-quantity').value);
    const total = qty * currentItemPrice;

    // Menampilkan Notifikasi Konfirmasi Pembelian/Pesanan
    alert(`🎉 Pesanan Dibuat!
    
    Item: ${currentItemName}
    Jumlah: ${qty} porsi/gelas
    Total Harga: ${formatRupiah(total)}
    
    Pesanan Anda sedang diproses oleh Bathara! Selamat Menikmati!`);
    
    // Tutup modal setelah konfirmasi
    closeModal();
}

// Tutup modal jika user mengklik area di luar modal
window.onclick = function(event) {
    const modal = document.getElementById('itemModal');
    if (event.target == modal) {
        closeModal();
    }
}

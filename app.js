/* =========================
   AMBIL ELEMENT FORM
========================= */
const dataJenis = document.getElementById("dataJenis");
const evakuasiInput = document.getElementById("evakuasiInput");
const grupJaga = document.getElementById("grupJaga");
const tanggal = document.getElementById("tanggal");

const pelapor = document.getElementById("pelapor");
const hp = document.getElementById("hp");
const alamat = document.getElementById("alamat");

const perwira = document.getElementById("perwira");

const terima = document.getElementById("terima");
const meluncur = document.getElementById("meluncur");
const selesai = document.getElementById("selesai");

const jumlahPersonil = document.getElementById("jumlahPersonil");
const unit = document.getElementById("unit");

const jenisUtama = document.getElementById("jenisUtama");
const jenisDetail = document.getElementById("jenisDetail");

const kronologis = document.getElementById("kronologis");
const tindakan = document.getElementById("tindakan");

const output = document.getElementById("output");

/* =========================
   DATA PETUGAS
========================= */
const dataPetugas = {
  "Kompi A": [
    "Arsudin / ASN",
    "Mulyadi S / ASN",
    "Wiwit S / ASN",
    "Yudhi R / ASN",
    "Hanan S. S / CPNS",
    "Riffat A / CPNS",
    "Aprijal / PJLP",
    "Bambang K / PJLP",
    "Ibnu S / PJLP",
    "Ismu S / PJLP",
    "Putu W / PJLP",
    "Raka / PJLP",
    "Robi / PJLP",
    "Syihab / PJLP",
    "Yazid N. H / PJLP"
  ],
  "Kompi B": [],
  "Kompi C": []
};

document.getElementById("kompi").addEventListener("change", function () {
  const container = document.getElementById("petugas");
  container.innerHTML = "";
  const list = dataPetugas[this.value];
  if (!list) return;

  list.forEach(nama => {
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.className = "petugas";
    cb.value = nama;
    container.appendChild(cb);
    container.append(" " + nama);
    container.appendChild(document.createElement("br"));
  });
});

/* =========================
   UTIL
========================= */
function getHari(tgl) {
  const hari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
  return hari[new Date(tgl).getDay()];
}

/* =========================
   EMOJI
========================= */
function emojiEvakuasi(text) {
  const t = text.toLowerCase();
  const rules = [
    { keys: ["ular"], emoji: "🐍" },
    { keys: ["kucing"], emoji: "🐱" },
    { keys: ["lebah","tawon"], emoji: "🐝" },
    { keys: ["biawak"], emoji: "🦎" },
    { keys: ["banjir"], emoji: "🚣" },
    { keys: ["kunci mobil"], emoji: "🚗" },
    { keys: ["kunci"], emoji: "🔑" },
    { keys: ["hp"], emoji: "📱" },
    { keys: ["cincin"], emoji: "💍" },
    { keys: ["pohon"], emoji: "🌳" },
    { keys: ["api","kebakaran"], emoji: "🔥" }
  ];
  for (let r of rules) {
    if (r.keys.some(k => t.includes(k))) return " " + r.emoji;
  }
  return " ⚙️";
}

/* =========================
   TEMPLATE OTOMATIS
========================= */
function getTemplateEvakuasi(jenis, alamatText) {
  const j = jenis.toLowerCase();

  if (j.includes("ular") || j.includes("biawak")) return {
    kronologis: `Pelapor melihat adanya hewan berbahaya di ${alamat.value} yang berpotensi membahayakan, kemudian melaporkan kejadian tersebut ke Sektor Pemadam Pesanggrahan.`,
    tindakan: `Petugas melakukan evakuasi menggunakan grabstick hingga hewan berhasil diamankan dan evakuasi berjalan aman.`
  };

  if (j.includes("lebah") || j.includes("tawon")) return {
    kronologis: `Pelapor melihat adanya sarang ${jenis} di ${alamat.value} yang berpotensi membahayakan warga sekitar.`,
    tindakan: `Petugas melakukan evakuasi sarang ${jenis} menggunakan plastik dan peralatan pendukung hingga aman.`
  };

  if (j.includes("kucing")) return {
    kronologis: `Pelapor melaporkan adanya kucing yang terjebak di pohon atau genteng rumah di ${alamat.value}.`,
    tindakan: `Petugas mengevakuasi kucing menggunakan tangga lipat dan jaring pengaman hingga berhasil dievakuasi.`
  };

  if (j.includes("cincin")) return {
    kronologis: `Pelapor datang langsung ke Kantor Damkar Sektor Pesanggrahan untuk permintaan evakuasi lepas cincin akibat jari mengalami pembengkakan.`,
    tindakan: `Petugas memotong cincin menggunakan gerinda mini hingga cincin terbelah dua dan terlepas dengan aman.`
  };

  if (j.includes("banjir")) return {
    kronologis: `Terjadi genangan air di ${alamat.value} akibat intensitas hujan yang tinggi sehingga mengganggu aktivitas warga.`,
    tindakan: `Petugas melakukan penyedotan dan pengalihan air menggunakan mesin pompa portable ke saluran air terdekat.`
  };

  if (j.includes("hp") || j.includes("kunci")) return {
    kronologis: `Pelapor melaporkan ${jenis} yang terjatuh ke area sempit seperti got atau celah bangunan di ${alamat.value}.`,
    tindakan: `Petugas melakukan evakuasi menggunakan grabstick dan kawat elastis hingga barang berhasil diamankan.`
  };

  if (j.includes("kunci mobil")) return {
    kronologis: `Pelapor melaporkan kunci mobil tertinggal di dalam kendaraan di ${alamat.value} sehingga kendaraan terkunci.`,
    tindakan: `Petugas melakukan pembukaan pintu kendaraan menggunakan air wedge dan kawat variasi hingga kunci berhasil diambil.`
  };

  if (j.includes("mobil") || j.includes("motor")) return {
    kronologis: `Kendaraan mengalami kendala operasional di ${alamat.value} sehingga membutuhkan bantuan evakuasi.`,
    tindakan: `Petugas melakukan penanganan dan evakuasi kendaraan menggunakan peralatan pendukung hingga aman.`
  };

  if (j.includes("pohon")) return {
    kronologis: `Warga melaporkan adanya pohon tumbang di ${alamat.value} yang mengganggu akses dan membahayakan.`,
    tindakan: `Petugas melakukan pemotongan dan pembersihan pohon tumbang hingga situasi aman dan terkendali.`
  };

  if (j.includes("kebakaran")) return {
    kronologis: `Terjadi kebakaran di ${alamat.value} yang dilaporkan oleh warga sekitar.`,
    tindakan: `Petugas melakukan pemadaman menggunakan peralatan pemadam hingga api berhasil dipadamkan dan situasi aman.`
  };

  return {
    kronologis: `Pelapor melaporkan adanya kejadian di ${alamat.value} yang membutuhkan penanganan.`,
    tindakan: `Petugas melakukan penanganan sesuai kondisi di lapangan hingga kegiatan berjalan aman dan lancar.`
  };
}

/* =========================
   AUTO ISI TEMPLATE
========================= */
evakuasiInput.addEventListener("change", () => {
  const tpl = getTemplateEvakuasi(evakuasiInput.value, alamat.value || "lokasi kejadian");
  kronologis.value = tpl.kronologis;
  tindakan.value = tpl.tindakan;
});

/* =========================
   SATGAS
========================= */
function getKoordinatorByKompi(kompi) {
  if (kompi === "Kompi A") {
    return `Bpk. Mulyadi, S.H
Bpk. Iskandar, S.T
Satgas/Katon Grup A Sektor X Pesanggrahan`;
  }

  if (kompi === "Kompi B") {
    return `Bpk. Fulan BA
Bpk. Fulin BB
Satgas/Katon Grup B Sektor X Pesanggrahan`;
  }

  if (kompi === "Kompi C") {
    return `Bpk. Fulon C
Satgas/Katon Grup C Sektor X Pesanggrahan`;
  }

  return "-";
}


/* =========================
   GENERATE LAPORAN 
========================= */
function generateLaporan() {
  let petugas = [];
  document.querySelectorAll(".petugas:checked").forEach((p, i) => {
    petugas.push(`${i + 1}. ${p.value}`);
  });

  const pj = perwira.options[perwira.selectedIndex];
  const jabatan = pj?.getAttribute("data-jabatan") || "";

  const kompiDipilih = document.getElementById("kompi").value;
  const koordinator = getKoordinatorByKompi(kompiDipilih);

  output.value = `
*SUDIN PENANGGULANGAN KEBAKARAN DAN PENYELAMATAN JAKARTA SELATAN*

*Evakuasi ${evakuasiInput.value}*${emojiEvakuasi(evakuasiInput.value)}
Hari/Tgl : ${getHari(tanggal.value)}, ${tanggal.value}

*Alamat*
${alamat.value}

*Perwira Piket 401*
${perwira.value}
${jabatan}

*Penanggung Jawab*
Bpk. Poengky Hermingto, S.E
Kasie Sektor X Pesanggrahan

*Koordinator*
${koordinator}

*Pelaksanaan*
Terima : ${terima.value.replace(":", ".")} WIB
Meluncur : ${meluncur.value.replace(":", ".")} WIB
Selesai : ${selesai.value.replace(":", ".")} WIB

*Pengerahan Personil*
${jumlahPersonil.value} Personil dan ${unit.value}

*Kronologis*
${kronologis.value}

*Tindakan*
${tindakan.value}

*Petugas*
${petugas.join("\n")}

*Demikian dilaporkan*
`.trim();
}

// ===============================
// EVENT LISTENER (PALING BAWAH)
// ===============================

// 1. saat pilih jenis evakuasi
document.getElementById("evakuasiInput").addEventListener("change", () => {
  const jenis = evakuasiInput.value;
  const alamatText = alamat.value.trim() || "lokasi kejadian";

  if (!jenis) return;

  const tpl = getTemplateEvakuasi(jenis, alamatText);
  kronologis.value = tpl.kronologis;
  tindakan.value = tpl.tindakan;
});

// 2. saat alamat diketik
document.getElementById("alamat").addEventListener("input", () => {
  if (!evakuasiInput.value) return;

  const tpl = getTemplateEvakuasi(
    evakuasiInput.value,
    alamat.value.trim() || "lokasi kejadian"
  );

  kronologis.value = tpl.kronologis;
  tindakan.value = tpl.tindakan;
});


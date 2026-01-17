const ROTASI_KOMPI = ["Kompi A", "Kompi B", "Kompi C"];

const dataPetugas = {
  "Kompi A": [
    "Kusumahadi/ASN",
    "Mulyadi Saputra/ASN",
    "Nuriyanto, SE/ASN",
    "Arsuddin, S.Ip./ASN",
    "Sigit Supriyanto/ASN",
    "Yudhi Rahmat/ASN",
    "Wiwit Sumarniyanto/ASN",
    "Hanan Seviola Silva/CPNS",
    "Kevin Dio Ananda/CPNS",
    "Riffat Atharsyan/CPNS",
    "Bambang Kusmanto/PJLP",
    "Ibnu Susetyodo/PJLP",
    "Ismu Saputra/PJLP",
    "A. Ardiansyah/PJLP",
    "Ahmad Robbi/PJLP",
    "Yajid Muhadi/PJLP",
    "Billy Yudistira Nugraha/PJLP",
    "Muhammad Abduh/PJLP",
    "M Taufik/PJLP"
  ],

  "Kompi B": [
    "Didi Rosadi, S.IP./ASN",
    "Eko Septiawan, S.H./ASN",
    "Doni Saputro, S.E./ASN",
    "Andriansyah, S.M./ASN",
    "Aziz Nurdin, S.H./ASN",
    "Arip Rahman Hakim/ASN",
    "Wahyu Nugroho/ASN",
    "Adam Suryana/CPNS",
    "Agge Nikolaus/CPNS",
    "Braja Mesti/CPNS",
    "Adnan Setiawan/PJLP",
    "Amri Ar Rachman/PJLP",
    "Muhammad Fadli/PJLP",
    "Mochamad Rastu Rizky/PJLP",
    "Sigit Riyanto/PJLP",
    "Chaerul Bahri/PJLP",
    "Ivan Fadillah/PJLP",
    "Mohamad Sholahudin/PJLP"
  ],

  "Kompi C": [
    "Eko Prasetyo, S.H./ASN",
    "Feri Hamdanika, SH/ASN",
    "Muhamad Dikky Purnama/ASN",
    "Ade Fadillah/ASN",
    "Bayu Hario Santoso, S.Kom./ASN",
    "Endang Hidayat/ASN",
    "Agus Suliyanto, SE/ASN",
    "Geza Ravi Rizky Lutviagusta/CPNS",
    "Sultan Mahesa/CPNS",
    "Andi Kurniawan/PJLP",
    "Burhanudin/PJLP",
    "Endang Nurcahya/PJLP",
    "Frido Amirulloh/PJLP",
    "Sahrul Gunawan/PJLP",
    "Sukron Khairil F./PJLP",
    "Andri Juliansyah/PJLP",
    "M. Tegar Maulana G./PJLP",
    "Adhiya Rizqi Amarullah/PJLP",
    "Rohman/PJLP"
  ]
};

const dataKoordinator = {
  "Kompi A": `Bpk. Mulyadi, SH
Bpk. Iskandar, S.T
Satgas/Katon Grup A Sektor X Pesanggrahan`,
  "Kompi B": `Bpk. Kaspul Arman, S.E.  
Satgas/Katon Grup B Sektor X Pesanggrahan`,
  "Kompi C": `Bpk. Nuriyanto, S.E.
  Rudiawan, S.H.       
Satgas/Katon Grup C Sektor X Pesanggrahan`
};

function getKompiOtomatis() {
  const now = new Date();
  let hari = now.getDay();
  if (now.getHours() < 7 || (now.getHours() === 7 && now.getMinutes() < 30)) {
    hari = hari - 1 < 0 ? 6 : hari - 1;
  }
  return ROTASI_KOMPI[hari % 3];
}

window.onload = () => {
  kompi.value = getKompiOtomatis();
  loadPetugas();
};

kompi.addEventListener("change", loadPetugas);

function loadPetugas() {
  petugas.innerHTML = "";
  (dataPetugas[kompi.value] || []).forEach((p,i)=>{
    petugas.innerHTML += `<input type="checkbox" class="p" value="${p}"> ${p}<br>`;
  });
}

function getHari(t){
  return ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"][new Date(t).getDay()];
}

function emojiEvakuasi(t){
  if(!t) return "";
  if(t.includes("ular")) return " 🐍";
  if(t.includes("kucing")) return " 🐱";
  if(t.includes("banjir")) return " 🚣";
  if(t.includes("api")) return " 🔥";
  return " ⚙️";
}

function generateLaporan() {
  const pj = perwira.options[perwira.selectedIndex];
  const jabatan = pj?.dataset.jabatan || "";

  const listPetugas = [...document.querySelectorAll(".p:checked")]
    .map((p,i)=>`${i+1}. ${p.value}`).join("\n");

  output.value = `
*SUDIN PENANGGULANGAN KEBAKARAN DAN PENYELAMATAN JAKARTA SELATAN*

*Evakuasi ${evakuasiInput.value}*${emojiEvakuasi(evakuasiInput.value)}
Hari/Tgl : ${getHari(tanggal.value)}, ${tanggal.value}

*Alamat*
${alamat.value}

*Perwira Piket*
${perwira.value}
${jabatan}

*Penanggung Jawab*
Bpk. Poengky Hermingto, S.E
Kasie Sektor X Pesanggrahan

*Koordinator*
${dataKoordinator[kompi.value]}

*Pelaksanaan*
Terima : ${terima.value.replace(":","." )} WIB
Meluncur : ${meluncur.value.replace(":","." )} WIB
Selesai : ${selesai.value.replace(":","." )} WIB

*Pengerahan Personil*
${jumlahPersonil.value} Personil dan ${unit.value}

*Kronologis*
${kronologis.value}

*Tindakan*
${tindakan.value}

*Petugas*
${listPetugas}

*Demikian dilaporkan*
`.trim();
}

function copyLaporan(){
  output.select();
  document.execCommand("copy");
  alert("Laporan berhasil disalin ✅");
}


const ROTASI_KOMPI = ["Kompi A", "Kompi B", "Kompi C"];

const dataPetugas = {
  "Kompi A": ["Arsudin","Mulyadi","Wiwit","Yudhi"],
  "Kompi B": ["Fulan","Fulin"],
  "Kompi C": ["Fulon"]
};

const dataKoordinator = {
  "Kompi A": `Bpk. Mulyadi, SH
Bpk. Iskandar, S.T
Satgas/Katon Grup A Sektor X Pesanggrahan`,
  "Kompi B": `Bpk. Fulan BA
Bpk. Fulin BB
Satgas/Katon Grup B Sektor X Pesanggrahan`,
  "Kompi C": `Bpk. Fulon C
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

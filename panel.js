const host = "https://panelbot.butterhostlive.my.id"
const application = {
    api_key: "ptla_vFDYFOdcMARZeR4zCx5jwluCC6tGrCOY8JX0zoozxMV", //Ambil di panel lu || caranya pergi ke setting admin lalu klik garis tiga di pojok kiri atas lalu klik Application API tinggal salin dehh
    c_api_key: "ptlc_ZqLN5tDcXIzxvIqTxVmunxusJVSY12922D0jNEdn7Wl" //Ambil di panel lu || caranya pergi ke Account Setting atau klik avatar akun lalu klik API Credentials lalu isi DESCRIPTION isinya bebas lalu klik CREATE
}
const serverCreate = {
    nestId: "5", //Nest Id panel lu
    eggId: " 15", //Egg Id panel lu
    limits: {
      db: "1", //Mending ga usah diganti
      backups: "1", //Mending ga usah diganti
      allocation: "1" //Mending ga usah diganti
    },
    eggs: {
      environment: {
        "STARTUP_CMD": "npm install", // Sesuai in sama egg lu
        "CMD_RUN": "npm start"
      }
    }
}

module.exports = { host, application, serverCreate }
<template>
  <div id="app">
    <input @click="pickFile" v-model="imageName" placeholder="SELECT IMAGE" />
    <input type="file" style="display: none;" ref="image" accept="image/*" @change="onFilePicked" />
    <textarea v-model="message"></textarea>
    <button @click="upload">アップロード</button>
  </div>
</template>

<script>
import { db } from "./main"

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      photo: null,
      photURL: null,
      dialog: false,
      message: "メッセージ",
      imageName: "",
      imageURL: "",
      imageFile: "",
      latitude: "",
      longitude: "",

    }
  },
  methods: {
    // 画像取得処理
    pickFile() {
      this.$refs.image.click();
      this.getPosition();
    },
    onFilePicked(e) {
      let files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageURL = fr.result;
          this.imageFile = files[0];
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageURL = "";
      }
    },
    // 画像アップロード処理
    upload() {
      // Storageオブジェクト作成
      let storageRef = firebase.storage().ref();
      // ファイルパス設定
      let incidentsRef = storageRef.child('images/' + this.imageName);
      // ファイルを適用してアップロード開始
      console.log("Uploading…");
      incidentsRef.put(this.imageFile).then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          db.collection("images").add({
            message: this.message,
            latitude: this.latitude,
            longitude: this.longitude,
            downloadURL,
            });
        });
      });
      console.log("Done.");
    },
    getPosition() {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.latitude = pos.coords.latitude
        this.longitude = pos.coords.longitude

        console.log("get position")
        console.log(this.latitude, this.longitude)
      });
    },
  },
  components: {}
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

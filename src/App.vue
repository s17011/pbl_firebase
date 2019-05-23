<template>
  <div id="app">
    <input @click="pickFile" v-model="imageName" placeholder="SELECT IMAGE" />
    <input type="file" style="display: none;" ref="image" accept="image/*" @change="onFilePicked" />
    <button @click="upload">アップロード</button>


    <!-- <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul> -->
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
      imageName: "",
      imageURL: "",
      imageFile: ""
    }
  },
  methods: {
    // 画像取得処理
    pickFile() {
      this.$refs.image.click();
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
    upload: function() {
      // Storageオブジェクト作成
      let storageRef = firebase.storage().ref();
      // ファイルパス設定
      let incidentsRef = storageRef.child('images/' + this.imageName);
      // ファイルを適用してアップロード開始
      console.log("Uploading…");
      incidentsRef.put(this.imageFile).then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          db.collection("images").add({ downloadURL });
        });
      });
      console.log("Done.");
    }
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

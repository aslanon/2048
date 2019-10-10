<template>
  <transition name="fade">
    <div v-show="isShow" class="vc-overlay" id="vueConfirm">
      <transition name="zoom">
        <div v-if="isShow" ref="vueConfirm" class="vc-container">
          <p>{{message}}</p>

          <div class="vc-btn-gridd">
            <button
              :disabled="isLoading  || isConfirmLoading"
              @click.stop="$emit('close')"
              class="vc-btn left"
            >{{button.no}}</button>

            <button
              :disabled="isLoading  || isConfirmLoading"
              @click.stop="saveChanges()"
              class="vc-btn"
            >{{button.yes}}</button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ConfirmPopup",
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },

    message: {
      type: String,
      default: "Are you sure?"
    },
    button: {
      type: Object,
      default: function() {
        return { no: "Cancel", yes: "Save" };
      }
    },
    email: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      password: null,
      isConfirmLoading: false,
      error: null
    };
  },
  methods: {
    documentClick(e) {
      try {
        let el = this.$refs.vueConfirm;
        let target = e.target;
        if (el !== target && !el.contains(target)) {
          this.$emit("close");
        }
      } catch (error) {}
    },

    saveChanges() {
      this.error = null;
      this.$emit("save", true);
    }
  },

  beforeDestroy() {
    document.removeEventListener("click", this.documentClick);
  },

  beforeMount() {
    document.addEventListener("click", this.documentClick);
  }
};
</script>

<style lang="scss" scoped>
p {
  color: black;
  padding: 2rem;
  width: 100%;
  font-weight: 700;
  text-align: center;
  font-size: 16px;
  line-height: initial;
}
.border-top {
  border-top: 1px solid rgb(224, 224, 224);
}
.vc-overlay {
  background: rgba(0, 0, 0, 0.29);
  width: 100%;
  height: 100%;
  transition: all 0.1s ease-in;
  left: 0;
  top: 0;
  z-index: 999999999999;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: baseline;
}
.vc-container {
  background: white;
  border-radius: 1rem;
  width: 286px;
  height: auto;
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: rgba(0, 0, 0, 0.29) 0px 3px 8px 0px;
}
.vc-btn-gridd {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 50px;
  border-radius: 0 0 1rem 1rem;
  overflow: hidden;
}
.vc-btn {
  border-radius: 0 0 1rem 0;
  color: cornflowerblue;
  background: white;
  border: 0;
  border-top: 1px solid rgb(224, 224, 224);
  cursor: pointer;
  font-weight: 700;
  outline: none;
}
.vc-btn:hover {
  background: whitesmoke;
}
.vc-btn:disabled {
  background: whitesmoke;
}
.vc-btn:active {
  box-shadow: inset 0 2px 0px 0px #00000014;
}
.vc-btn.left {
  border-radius: 0;
  /* color: black; */
  border-right: 1px solid #e0e0e0;
}
</style>
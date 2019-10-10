<template>
  <!-- :class="{'isMoving': pastBoard[rowIndex][cIndex] !== item }" -->

  <span :class="{'isChanged': tile > 0  }" :value="tile" class="tile">{{tile != 0 ? tile : null}}</span>
</template>
<script>
export default {
  name: "BoardTile",
  props: {
    tile: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss" scoped>
.tile {
  width: 100px;
  height: 100px;
  margin: 5px;
  line-height: 90px;
  display: inline-block;
  font-size: 55px;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  border-radius: 7px;
  color: #766;
  background-color: #dcb;
  user-select: none;
  position: relative;

  &[value="0"] {
    background-color: #dcb;
  }

  &[value="2"] {
    background-color: #eee;
  }

  &[value="4"] {
    background-color: #eec;
  }

  &[value="8"] {
    color: #ffe;
    background-color: #fb8;
  }

  &[value="16"] {
    color: #ffe;
    background-color: #f96;
  }

  &[value="32"] {
    color: #ffe;
    background-color: #f75;
  }

  &[value="64"] {
    color: #ffe;
    background-color: #f53;
  }

  &[value="128"] {
    color: #ffe;
    background-color: #ec7;
    font-size: 45px;
  }

  &[value="256"] {
    color: #ffe;
    background-color: #ec6;
    font-size: 45px;
  }

  &[value="512"] {
    color: #ffe;
    background-color: #ec5;
    font-size: 45px;
  }

  &[value="1024"] {
    color: #fff;
    background-color: #ec3;
    font-size: 35px;
  }

  &[value="2048"] {
    color: #fff;
    background-color: #ec2;
    font-size: 35px;
  }
}

// transition: 1s ease;
// &.isChanged {
//   animation: changed 0.25s ease both;
// }

@keyframes changed {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>
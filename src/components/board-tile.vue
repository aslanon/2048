<template>
  <span :class="classes" :value="tile.value">{{tile.value != 0 ? tile.value : null}}</span>
</template>
<script>
export default {
  name: "BoardTile",
  props: {
    tile: {
      type: Object,
      default: () => ({
        value: 0,
        isMerged: false,
        isMoved: false,
        col: 0,
        row: 0
      })
    }
  },
  computed: {
    classes() {
      var classArray = ["tile"];

      classArray.push("absolute");
      classArray.push("tile" + this.tile.value);
      classArray.push("position_" + this.tile.row + "_" + this.tile.col);

      if (this.tile.isMerged) {
        classArray.push("isMerged");
      }

      // if (this.tile.isMoved) {
      //   classArray.push(
      //     "row_from_" + this.tile.pastRow + "_to_" + this.tile.row
      //   );
      //   classArray.push(
      //     "column_from_" + this.tile.pastCol + "_to_" + this.tile.col
      //   );
      //   classArray.push("isMoving");
      // }

      return classArray.join(" ");
    }
  }
};
</script>

<style lang="scss" scoped>
.isMerged {
  animation: changed 0.25s ease both;
}
@keyframes changed {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
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
// .absolute {
//   position: absolute;
//   z-index: 9999;
// }
// @for $row from 0 through 3 {
//   @for $column from 0 through 3 {
//     .position_#{$row}_#{$column}:not(.isMoving) {
//       top: 110px * $row + 5px;
//       left: 110px * $column + 5px;
//     }
//   }
// }
// @for $fromRow from 0 through 3 {
//   @for $toRow from 0 through 3 {
//     $name: row_from_#{$fromRow}_to_#{$toRow};

//     @if $fromRow == $toRow {
//       .#{$name} {
//         top: 110px * $toRow + 5px;
//       }
//     } @else {
//       .#{$name} {
//         animation-duration: 0.2s;
//         animation-name: $name;
//         animation-fill-mode: forwards;
//       }

//       @keyframes #{$name} {
//         from {
//           top: 110px * $fromRow + 5px;
//         }
//         to {
//           top: 110px * $toRow + 5px;
//         }
//       }
//     }
//   }
// }

// @for $fromColumn from 0 through 3 {
//   @for $toColumn from 0 through 3 {
//     $name: column_from_#{$fromColumn}_to_#{$toColumn};

//     @if $fromColumn == $toColumn {
//       .#{$name} {
//         left: 110px * $toColumn + 5px;
//       }
//     } @else {
//       .#{$name} {
//         animation-duration: 0.2s;
//         animation-name: $name;
//         animation-fill-mode: forwards;
//       }

//       @keyframes #{$name} {
//         from {
//           left: 110px * $fromColumn + 5px;
//         }
//         to {
//           left: 110px * $toColumn + 5px;
//         }
//       }
//     }
//   }
// }
</style>
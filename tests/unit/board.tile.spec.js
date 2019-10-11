import { shallowMount } from "@vue/test-utils";
import BoardTile from "@/components/board-tile.vue";

describe("board-tile.vue", () => {
  it("renders props.tile when passed", () => {
    const data = { value: 0, isMerged: false, isMoved: false, col: 0, row: 0 };
    const wrapper = shallowMount(BoardTile, {
      propsData: data
    });
    expect(wrapper.props().value).toBe(0);
    expect(wrapper.find(".tile").text()).toBe("h");
  });
});

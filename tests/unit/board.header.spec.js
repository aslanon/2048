import { shallowMount } from "@vue/test-utils";
import BoardHeader from "@/components/board-header.vue";

describe("board-header.vue", () => {
  it("renders props.scores, props.targetTile and props.currentTile when passed", () => {
    const tile = {
      scores: {
        added: 8,
        current: 8,
        best: 16
      },
      targetTile: 2048,
      currentTile: 2048
    };
    const wrapper = shallowMount(BoardHeader, {
      propsData: tile
    });

    expect(wrapper.props().scores.current).toBe(8);
    expect(wrapper.find(".left>p").text()).toBe("8");

    expect(wrapper.props().scores.best).toBe(16);
    expect(wrapper.find(".right>p").text()).toBe("16");

    expect(wrapper.props().currentTile).toBe(2048);
    expect(wrapper.find(".intro-text").text()).toBe(
      "You next goal is to get to the 4096 tile!"
    );
  });
});

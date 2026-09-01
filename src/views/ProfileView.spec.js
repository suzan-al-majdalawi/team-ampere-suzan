/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import ProfileView from "./ProfileView.vue";

const mockUser = {
  customerNo: "12345",
  name: "Suzan Majdalawi",
  email: "suzan@example.com",
  address: "Solvägen 12",
};

const mockStore = {
  user: { ...mockUser },
  load: vi.fn(),
  save: vi.fn(),
};

vi.mock("../stores/user", () => ({
  useUserStore: () => mockStore,
}));

describe("ProfileView", () => {
  beforeEach(() => {
    mockStore.user = { ...mockUser };
    mockStore.load.mockReset();
    mockStore.save.mockReset();
  });

  it("visar kundnummer och användaruppgifter", () => {
    const wrapper = mount(ProfileView);

    expect(wrapper.text()).toContain("12345");

    expect(wrapper.find("#profile-name").element.value).toBe("Suzan Majdalawi");

    expect(wrapper.find("#profile-email").element.value).toBe(
      "suzan@example.com",
    );

    expect(wrapper.find("#profile-address").element.value).toBe("Solvägen 12");
  });

  it("sparar ändrade användaruppgifter", async () => {
    const wrapper = mount(ProfileView);

    await wrapper.find("#profile-name").setValue("Nytt Namn");
    await wrapper.find("#profile-email").setValue("ny@example.com");
    await wrapper.find("#profile-address").setValue("Ny adress 5");

    await wrapper.findComponent({ name: "AppButton" }).trigger("click");

    expect(mockStore.save).toHaveBeenCalledWith({
      name: "Nytt Namn",
      email: "ny@example.com",
      address: "Ny adress 5",
    });
  });

  it("återställer ändringar när användaren klickar på Ångra", async () => {
    const wrapper = mount(ProfileView);

    await wrapper.find("#profile-name").setValue("Ändrat namn");
    await wrapper.find("#profile-email").setValue("ändrad@example.com");
    await wrapper.find("#profile-address").setValue("Ändrad adress");

    await wrapper.find("button.button-secondary").trigger("click");

    expect(wrapper.find("#profile-name").element.value).toBe("Suzan Majdalawi");

    expect(wrapper.find("#profile-email").element.value).toBe(
      "suzan@example.com",
    );

    expect(wrapper.find("#profile-address").element.value).toBe("Solvägen 12");
  });

  it("laddar användaren om store.user saknas", async () => {
    mockStore.user = null;

    mockStore.load.mockImplementation(async () => {
      mockStore.user = { ...mockUser };
    });

    mount(ProfileView);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockStore.load).toHaveBeenCalled();
  });

  it("sparar inte när e-postadressen är ogiltig", async () => {
    const wrapper = mount(ProfileView);

    await wrapper.find("#profile-email").setValue("Anna Andersson");

    await wrapper.findComponent({ name: "AppButton" }).trigger("click");

    expect(mockStore.save).not.toHaveBeenCalled();
    expect(wrapper.text()).toContain("Ange en giltig e-postadress");
  });
});

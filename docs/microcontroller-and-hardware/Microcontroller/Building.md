# Building from source

❗️ This setup works, but is not optimal yet. If you have any Ideas, don't hesitate to add a PR!

1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/starklicht-stm32.git
   ```
2. Open STM32CubeIDE
3. Select `File` → `New` → `STM32 Project From Existing STM32CubeMX Configuration File`
4. A new Popup with Project Creation Wizard appears
5. `File`: `Browse` → Select the `.ioc` File of this Repository
6. Set Targeted Language to `C++`
7. Click `Finish`
8. Replace `Inc`, `Src` and `Startup` in `Core` with the ones from this Repo
9. Replace `STM32F401CCUX_FLASH.ld` with the one from the Repo

Now you can Build the Project.
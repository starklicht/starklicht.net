## PCBs

⬇️💾 [Download Hardware files on Cults3D](https://cults3d.com/de/modell-3d/gadget/starklicht)

You also find Schemas in this document. PDF in the Cults3D Link.

> **Note**: PCB Documentation is a work in progress!

The PCBs can be ordered with pre-soldered components. You can [Download the Hardware files on Cults3D](https://cults3d.com/de/modell-3d/gadget/starklicht).

To order the PCBs with components, you will need the Bill of Materials (BOM) and Pick and Place (PnP) files. These can be found in the [[Bill of Materials|Bill-of-Materials]] section. For a guide on how to use these files, see [this JHD PCB blog post](https://jhdpcb.com/blog/essential-pcb-bom-guide/).

There are three types of PCBs in this project:

### LED Mount (`Gerber_PCB_LED_HOLDER.zip`)

This PCB is used to mount the high-power LED. It also includes a temperature sensor (NTC) for monitoring the LED's temperature.

<img width="531" alt="grafik" src="https://github.com/user-attachments/assets/458f4083-1af9-4632-ae07-c9b93ecc9560" />

**Key Components:**

*   **RGB_LED_100w:** The main 100W RGB LED.
*   **NTC:** A thermistor to monitor the LED temperature.
*   **XH-8_FLAT:** An 8-pin connector.

**Schematics**
![Schematic_LED-Halter-einfach_2025-06-28](https://github.com/user-attachments/assets/c693cb15-bd7e-47e8-9bc1-a1287be12b23)

### Controller (`Gerber_PCB_Black pill PCB.zip`)

This is the main controller board for the Starklicht. It houses the microcontroller, power regulation circuitry, and connectors for all the peripherals.

<img width="580" alt="grafik" src="https://github.com/user-attachments/assets/0316a87a-8fef-42f9-9b55-5a24d3606644" />

**Key Components:**

*   **BLACKPILLF4 (STM32F411CEU6):** The microcontroller.
*   **AMS1117-3.3 & AMS1117-5.0:** 3.3V and 5V voltage regulators.
*   **XL1509-12E1:** A 12V buck converter.
*   **MAX4080TASA:** A current sense amplifier.
*   **Connectors:** Various connectors for the display, buttons, Bluetooth module, and LED drivers.

**Schematics**

![black-pill-schema](https://github.com/user-attachments/assets/8d0581ba-13cb-4767-9480-61a4cd46904d)


### LED Driver (`Gerber_PCB_Two_stage LED DRIVER.zip`)

This is a two-stage constant current LED driver. You will need three of these boards, one for each color channel (Red, Green, and Blue). They are designed to be stacked on top of the controller board.

<img width="225" alt="grafik" src="https://github.com/user-attachments/assets/117126d3-325a-4a7b-a28b-52f53de69ae2" />

**Key Components:**

*   **TPS55340PWPR:** A non-synchronous buck-boost converter.
*   **LM3406HVMHX:** A constant current buck regulator.
*   **NCE6020AK:** A 60V N-Channel MOSFET.
*   **Connectors:** Headers for stacking the boards.


**Schematics**

![led-driver-black-pill-schema](https://github.com/user-attachments/assets/99a47984-1e3d-4e18-8ad0-ccdacd288173)


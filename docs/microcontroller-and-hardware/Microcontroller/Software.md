## Description

## Software API Reference 📡

This document outlines the software messaging API for controlling the Starklicht device.

All multi-byte values are encoded in **Big Endian** format.

### API Message Overview

| ID | Message Name | Description | Payload Structure | Example |
|:---|:---|:---|:---|:---|
| `0` | **Set Color** 🎨 | Sets the lamp to a single solid color. | `[ID, Red, Green, Blue]` (Red/Green/Blue: 0-255) | Set to Blue: `[0, 0, 0, 255]` |
| `1` | **Send Animation** ✨ | Plays a gradient animation with multiple color points. | `[ID, Interp, Time, Dur(m), Dur(s), Dur(cs), N, ...Points]` | *See Animation Details Below* |
| `2` | **Set Brightness** ☀️ | Adjusts the overall brightness percentage. | `[ID, Brightness]` (Brightness: 0-100) | Set to 50%: `[2, 50]` |
| `3` | **Fade** ⏱️ | Fades to a target color over specified duration. | `[ID, Dur(16-bit), R, G, B, Ease]` | Fade to purple over 1.5s: `[3, 5, 220, 128, 0, 128, 1]` |
| `4` | **Save/Load Preset** 💾 | Saves current state to preset or loads from one. | `[ID, Save Flag, Index]` (Flag: 1=Save/0=Load, Index: 0-3) | Save to Button 1: `[4, 1, 0]` |

#### Animation Message Details (ID: 1)
- **Interp**: `0`=Linear, `1`=Ease  
- **Time**: `0`=Once, `1`=Repeat, `2`=Mirror  
- **Dur(m/s/cs)**: Duration in Minutes/Seconds/Centiseconds  
- **N**: Number of Color Points  
- **Points**: N blocks of Color Point data (5 bytes each, see structure below)

---

### Animation Color Point Structure

Each Color Point used in the **Animation Message** (ID: `1`) has the following 5-byte structure:

| Offset | Field | Size | Description |
|:---|:---|:---|:---|
| `+0` | Red | 1 Byte | Red channel (0-255) |
| `+1` | Green | 1 Byte | Green channel (0-255) |
| `+2` | Blue | 1 Byte | Blue channel (0-255) |
| `+3, +4` | Position | 2 Bytes | 16-bit integer representing the point's position on the gradient (0-1000, scaled by 10) |

## Architecture

The firmware is built upon a modular architecture that separates concerns and promotes code reusability. The main components are:

*   **Main Application:** The entry point of the application, responsible for initializing the hardware and starting the main loop.
*   **Controller:** The central logic unit that coordinates the different modules of the application.
*   **Display:** Manages the graphical user interface on the OLED display, utilizing the u8g2 library.
*   **Animation:** Handles the creation and playback of complex lighting animations.
*   **Battery:** Monitors the battery level and provides power management functionalities.
*   **Messaging:** Implements the communication protocol for receiving commands over Bluetooth Low Energy (BLE).
*   **EEPROM:** Provides non-volatile memory storage for saving and loading presets.

## Modules

### `starklicht_library`

This library contains the core logic of the Starklicht firmware. It is designed to be portable and can be used in other projects as well.

*   **`animator.h` / `animator.cpp`:** Manages the playback of animations, including color gradients and fades.
*   **`ButtonController.h` / `ButtonController.cpp`:** Handles button inputs and events.
*   **`color.h`:** Defines data structures and functions for color manipulation.
*   **`controller.h` / `controller.cpp`:** The main controller of the application, responsible for coordinating all the other modules.
*   **`CurrentSensor.h` / `CurrentSensor.cpp`:** Reads data from the current sensor to monitor power consumption.
*   **`display.h` / `display.cpp`:** Provides a high-level interface for drawing on the OLED display.
*   **`fan_control.h` / `fan_control.cpp`:** Controls the speed of the cooling fan based on the temperature of the LEDs.
*   **`FlashEEPROM.h` / `FlashEEPROM.cpp`:** Implements an EEPROM-like interface using the flash memory of the microcontroller.
*   **`interpolator.h` / `interpolator.cpp`:** Provides different interpolation methods for smooth animations.
*   **`keyframe.h` / `keyframe.cpp`:** Defines the data structure for keyframes, which are used to create complex animations.
*   **`message_manager.h` / `message.h` / `message.cpp`:** Parses and handles incoming messages from the BLE interface.
*   **`OneButton.h` / `OneButton.cpp`:** A library for debouncing and handling button presses.
*   **`poti_input.h` / `poti_input.cpp`:** Reads the value of the potentiometer for adjusting brightness and other parameters.
*   **`runningtimecalculation.h` / `runningtimecalculation.cpp`:** Calculates the remaining running time based on the current power consumption.
*   **`serialization.h` / `serialization.cpp`:** Provides functions for serializing and deserializing data for storage in the EEPROM.

### `u8g2`

This is a popular library for controlling monochrome OLED and LCD displays. It is used by the `display` module to draw the user interface.

## Key Concepts

### Animations

Animations are created by defining a series of keyframes. Each keyframe has a color and a position in time. The `animator` module interpolates between these keyframes to create smooth transitions.

### Messaging

The firmware uses a custom messaging protocol to receive commands over BLE. The protocol is designed to be lightweight and efficient, with a focus on minimizing the size of the messages.

### Presets

The current state of the lamp, including the selected color or animation, can be saved to one of four preset buttons. These presets are stored in the flash memory and can be recalled at any time.

### Message Framing

Messages are framed using a specific protocol to ensure reliable transmission. Each message is terminated by an **end marker**, which is a two-byte sequence: the escape character (`0x00`) followed by a newline character (`0x0A`). Additionally, a special **escape character** (`0x00`) is used to escape any occurrences of the end marker or the escape character itself within the message payload. This prevents misinterpretation of data as message delimiters.

**Example:**
If the payload contains the byte `0x0A` (newline character), it will be escaped to `0x00 0x0A`.
If the payload contains the byte `0x00` (escape character), it will be escaped to `0x00 0x00`.


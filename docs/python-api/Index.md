# Starklicht Python API

This API allows you to control a Starklicht BLE lamp using Python. It provides a set of classes to construct and send various commands to the lamp.

## Installation

Before using the API, you need to install the required libraries. It's recommended to use a virtual environment.

```bash
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
pip install -r requirements.txt
```

### How it Works

1.  **`StarklichtProtocol`**: This is the main class that manages the connection to the lamp.
    *   `__init__(address, characteristic_uuid)`: Creates a new instance.
    *   `connect()`: Establishes a connection.
    *   `disconnect()`: Closes the connection.
    *   `send_message(message)`: Sends a message object to the lamp.

2.  **Message Classes**: Each message type has its own class (e.g., `ColorMessage`, `BrightnessMessage`). You create an instance of the message you want to send and pass it to the `send_message` method.

    *   `ColorMessage(red, green, blue, master)`: Sets the lamp to a specific color. `master` controls overall brightness (0-255).
    *   `BrightnessMessage(brightness)`: Sets the overall brightness of the lamp (0-255).
    *   `FadeMessage(duration, color, ease)`: Fades the lamp to a target color over a specified duration. `ease=True` enables a smooth fade.
    *   `AnimationMessage(colors, config)`: Plays a custom animation with multiple color points and animation settings.
        *   `colors`: A list of `ColorPoint` objects, each with a `color` (RGBA list) and `point` (0.0-1.0) indicating its position in the animation.
        *   `config`: An `AnimationSettingsConfig` object defining `interpolation_type` (linear/constant), `time_factor` (repeat/pingpong/once/shuffle), and `minutes`, `seconds`, `millis` for duration.
    *   `OnOffMessage(state)`: Turns the lamp on (`state=True`) or off (`state=False`).
    *   `PotiMessage(value)`: Sends a potentiometer value (0-255). The exact effect depends on the lamp's firmware.
    *   `ClearMessage()`: Clears any active animations or effects, returning the lamp to a default state (often the last set static color).
    *   `RequestMessage()`: Sends a request to the lamp. The lamp's response (if any) would need to be handled by a notification listener, which is not covered in this basic example.
    *   `SaveMessage(save, button)`: Saves the current lamp state to a specific button (`button` 1-4) if `save=True`. If `save=False`, it loads the state from that button.

3.  **`MessageFactory`**: This utility class helps create message objects from a dictionary, typically parsed from JSON. This is useful for integrating with external systems that send commands as JSON.

    *   `create_message_from_json(json_data)`: Takes a dictionary (e.g., `{"type": "COLOR", "data": {"color": 0xFF00FF00}}`) and returns the corresponding message object.

### Finding your Device Address and Characteristic UUID

You will need to know the Bluetooth address of your lamp and the UUID of the characteristic you want to write to. If you are using a common HM-10 module, the default serial characteristic UUID is often `0000ffe1-0000-1000-8000-00805f9b34fb`.

You can use a BLE scanner app on your phone or a Python library like `bleak` to discover the address and services of your device. The `sample.py` script includes a `--scan` option to help you find devices.

## Usage

Here's a basic example of how to connect to a lamp and send various commands:

```python
import asyncio
from datetime import timedelta
from starklicht_api.protocol import StarklichtProtocol
from starklicht_api.color_message import ColorMessage
from starklicht_api.brightness_message import BrightnessMessage
from starklicht_api.fade_message import FadeMessage
from starklicht_api.animation_message import AnimationMessage
from starklicht_api.onoff_message import OnOffMessage
from starklicht_api.poti_message import PotiMessage
from starklicht_api.clear_message import ClearMessage
from starklicht_api.request_message import RequestMessage
from starklicht_api.save_message import SaveMessage
from starklicht_api.message_factory import MessageFactory
from starklicht_api.models import ColorPoint, AnimationSettingsConfig
from starklicht_api.enums import InterpolationType, TimeFactor, MessageType

# Replace with your lamp's address and characteristic UUID
DEVICE_ADDRESS = "00:11:22:33:44:55"
CHARACTERISTIC_UUID = "0000ffe1-0000-1000-8000-00805f9b34fb"  # HM-10 default

async def main():
    # Create a protocol instance
    protocol = StarklichtProtocol(DEVICE_ADDRESS, CHARACTERISTIC_UUID)

    try:
        # Connect to the lamp
        await protocol.connect()
        print("Connected to the lamp.")

        # --- Send a simple color message ---
        color_msg = ColorMessage(red=255, green=0, blue=0, master=255)
        await protocol.send_message(color_msg)
        print("Sent color message (RED).")
        await asyncio.sleep(2)

        # --- Send a brightness message ---
        brightness_msg = BrightnessMessage(brightness=128)  # 50% brightness
        await protocol.send_message(brightness_msg)
        print("Sent brightness message (50%).")
        await asyncio.sleep(2)

        # --- Send a fade message ---
        fade_msg = FadeMessage(
            duration=timedelta(seconds=3),
            color=[0, 255, 0, 255],  # green
            ease=True
        )
        await protocol.send_message(fade_msg)
        print("Sent fade message (fading to GREEN).")
        await asyncio.sleep(3)

        # --- Send an animation message ---
        animation_msg = AnimationMessage(
            colors=[
                ColorPoint(color=[255, 0, 0, 255], point=0.0),
                ColorPoint(color=[0, 0, 255, 255], point=1.0),
            ],
            config=AnimationSettingsConfig(
                interpolation_type=InterpolationType.linear,
                time_factor=TimeFactor.repeat,
                minutes=0,
                seconds=2,
                millis=0
            )
        )
        await protocol.send_message(animation_msg)
        print("Sent animation message (RED to BLUE linear).")
        await asyncio.sleep(5)

        # --- Send an On/Off message (Turn off) ---
        onoff_off_msg = OnOffMessage(state=False)
        await protocol.send_message(onoff_off_msg)
        print("Sent On/Off message (OFF).")
        await asyncio.sleep(2)

        # --- Send an On/Off message (Turn on) ---
        onoff_on_msg = OnOffMessage(state=True)
        await protocol.send_message(onoff_on_msg)
        print("Sent On/Off message (ON).")
        await asyncio.sleep(2)

        # --- Send a Poti message ---
        poti_msg = PotiMessage(value=150) # Example poti value
        await protocol.send_message(poti_msg)
        print("Sent Poti message (value 150).")
        await asyncio.sleep(2)

        # --- Send a Save message (Save current state to button 1) ---
        save_msg = SaveMessage(save=True, button=1)
        await protocol.send_message(save_msg)
        print("Sent Save message (saving to button 1).")
        await asyncio.sleep(2)

        # --- Send a Clear message ---
        clear_msg = ClearMessage()
        await protocol.send_message(clear_msg)
        print("Sent Clear message.")
        await asyncio.sleep(2)

        # --- Send a Request message (Note: Response handling not implemented in this example) ---
        request_msg = RequestMessage()
        await protocol.send_message(request_msg)
        print("Sent Request message (no response handling shown).")
        await asyncio.sleep(2)

        # --- Example using MessageFactory to create a message from JSON ---
        json_color_data = {
            "type": "COLOR",
            "data": {
                "color": 0xFF00FF00 # ARGB format: Alpha (Master), Red, Green, Blue
            }
        }
        color_from_json = MessageFactory.create_message_from_json(json_color_data)
        await protocol.send_message(color_from_json)
        print("Sent color message created from JSON (MAGENTA).")
        await asyncio.sleep(2)


    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        # Disconnect from the lamp
        if protocol.client and protocol.client.is_connected:
            await protocol.disconnect()
            print("Disconnected from the lamp.")

if __name__ == "__main__":
    asyncio.run(main())

```

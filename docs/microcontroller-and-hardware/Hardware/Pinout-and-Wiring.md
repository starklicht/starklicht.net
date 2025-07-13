## Pinout and Wiring

The following table details the pin connections for the Starklicht project on the STM32F401CCU6 Blackpill board.

| Pin | Function | Device | Description |
|---|---|---|---|
| PA0 | ADC1_IN0 | Temperature Sensor;Components | Temperature Sensor for the LEDs |
| PA1 | ADC1_IN1 | Temperature Sensor;Components | Temperature Sensor for the Driver |
| PA2 | ADC1_IN2 | Temperature Sensor | Temperature Sensor (Debug) |
| PA3 | ADC1_IN3 | Temperature Sensor | Temperature Sensor (Debug) |
| PA4 | ADC1_IN4 | Potis | Red Color Adjustment |
| PA5 | ADC1_IN5 | Potis | Green Color Adjustment |
| PA6 | ADC1_IN6 | Potis | Blue Color Adjustment |
| PA7 | ADC1_IN7 | Potis | Master Brightness/Function |
| PA8 | GPIO_Input | Bluetooth Module | Bluetooth State |
| PA9 | USART1_TX | Bluetooth Module | UART Transmit |
| PA10 | USART1_RX | Bluetooth Module | UART Receive |
| PA12 | GPIO_Output | Display  | SPI Chip Select |
| PA15 | GPIO_Output | Display | Display D/C |
| PB0 | ADC1_IN8 | Current Sensor, Battery | Measures the current consumption |
| PB1 | ADC1_IN9 | Battery | Measures the battery voltage |
| PB3 | SPI1_SCK | Display | SPI Clock |
| PB4 | GPIO_Output | Display | Display Reset |
| PB5 | SPI1_MOSI | Display | SPI MOSI |
| PB6 | TIM4_CH1 | LED | Red LED PWM Control |
| PB7 | TIM4_CH2 | LED | Green LED PWM Control |
| PB8 | TIM4_CH3 | LED | Blue LED PWM Control |
| PB9 | TIM4_CH4 | LED| Fan PWM Control |
| PB12 | GPIO_Input | Buttons | Button 4 |
| PB13 | GPIO_Input | Buttons | Button 3 |
| PB14 | GPIO_Input | Buttons | Button 2 |
| PB15 | GPIO_Input | Buttons | Button 1 |
| PC13 | GPIO_Output | LED | On-board LED |

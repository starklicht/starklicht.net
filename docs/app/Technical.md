# Starklicht Controller Technical Documentation

This document provides a technical overview of the Starklicht Controller app, including its architecture, dependencies, and codebase structure.

## 1. Architecture

The Starklicht Controller app is built using the Flutter framework, which allows for cross-platform development from a single codebase. The app follows a reactive programming model, with a clear separation of concerns between the UI (View), business logic (Controller), and data (Model).

### 1.1. Model-View-Controller (MVC)

The app's architecture is based on the Model-View-Controller (MVC) pattern.

*   **Model:** The Model represents the app's data and business logic. It includes classes for managing Bluetooth devices, animations, colors, and other data.
*   **View:** The View is responsible for rendering the UI and handling user input. It is built using Flutter widgets and is kept as simple as possible, with all business logic handled by the Controller.
*   **Controller:** The Controller acts as an intermediary between the Model and the View. It handles user input, updates the Model, and notifies the View of any changes.

### 1.2. Bluetooth Communication

The app uses the `flutter_blue_plus` package to communicate with Starklicht lamps via Bluetooth Low Energy (BLE). The `StarklichtBluetoothController` class encapsulates all BLE-related functionality, including scanning for devices, connecting to devices, and sending and receiving data.

### 1.3. State Management

The app uses a combination of `StatefulWidget` and `StreamBuilder` for state management. The `BluetoothController` exposes streams of data, such as the list of connected devices and connection state changes. The UI then subscribes to these streams and updates automatically when the data changes.

## 2. Dependencies

The Starklicht Controller app uses the following key dependencies:

*   **flutter:** The core Flutter framework.
*   **flutter_blue_plus:** For Bluetooth Low Energy communication.
*   **i18n_extension:** For internationalization and localization.
*   **shared_preferences:** For persisting simple data.
*   **sembast:** For a simple, file-based database.
*   **lottie:** For displaying Lottie animations.
*   **flex_color_picker:** For a flexible color picker widget.

For a full list of dependencies, see the `pubspec.yaml` file.

## 3. Codebase Structure

The codebase is organized into the following directories:

*   **lib/:** The main source code for the app.
    *   **controller/:** Contains the `StarklichtBluetoothController` and other controller classes.
    *   **i18n/:** Contains the internationalization files.
    *   **messages/:** Contains the data models for messages sent to and from the Starklicht lamps.
    *   **model/:** Contains the app's data models, such as `Animation`, `Color`, and `Orchestra`.
    *   **persistence/:** Contains the `Persistence` class for saving and loading data.
    *   **view/:** Contains the app's UI widgets.
*   **assets/:** Contains the app's assets, such as images, fonts, and Lottie animations.
*   **test/:** Contains the app's unit and widget tests.

## 4. Getting Started with Development

To get started with developing the Starklicht Controller app, you will need to have Flutter installed on your machine. You can find instructions on how to install Flutter on the [official Flutter website](https://flutter.dev/).

Once you have Flutter installed, you can clone the repository and run the app:

```
git clone https://github.com/starklicht/starklicht-app.git
cd starklicht-app
flutter pub get
flutter run
```

## 5. Building and Releasing

To build the app for release, you can use the following Flutter commands:

*   **Android:** `flutter build apk --release`
*   **iOS:** `flutter build ios --release`
*   **Web:** `flutter build web`
*   **macOS:** `flutter build macos`
*   **Windows:** `flutter build windows`
*   **Linux:** `flutter build linux`

For more information on building and releasing Flutter apps, see the [official Flutter documentation](https://flutter.dev/docs/deployment).

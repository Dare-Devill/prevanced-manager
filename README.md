<div align="center">

<img height="100px" src="https://github.com/prevanced/prevanced-manager/assets/63334479/3bfedf15-9852-4447-af98-c7e38d6cf93e" />
  
# PreVanced Manager 

This is a fork of [This Repo](https://github.com/prevanced/prevanced-manager/) with some additional features.<br>
A simple android app to download and install latest release from [ReVanced APKs](https://github.com/Dare-Devill/Revanced-apps).

</div>

## Features

- Download the latest ReVanced APKs directly from the app.
- Change GitHub repository for fetching release.

## Installation

Download the latest release from [here](https://github.com/Dare-Devill/prevanced-manager/releases/latest).

## Screenshots

|Manager|Options|
|---|---|
|![Screenshot_2024_02_06_00_50_19_37_4ed0fa99112b9393c8307694b9754972](https://github.com/prevanced/prevanced-manager/assets/63334479/ff2d0c1e-abdf-4ed4-acf1-42cba16b09b7)|![Screenshot_2024_02_03_15_45_46_12_4ed0fa99112b9393c8307694b9754972](https://github.com/prevanced/prevanced-manager/assets/63334479/28c114e9-f08e-4d7f-94ca-ef56dc4fc02d)|

## Todo

- [ ] Add feature to check for updates and push notifications
- [ ] View all installed supported apps and manage them.
- [ ] One click install for all supported apps

## Contributors

[![Contributors](https://contributors-img.web.app/image?repo=Dare-Devill/prevanced-manager)](https://github.com/Dare-Devill/prevanced-manager/graphs/contributors)

## Contributing

We welcome contributions from the community. We use React Native for the app with Expo. It is fully written in TypeScript and compiled to native Java/Kotlin code for Android.

We recommend you use `bun` to manage the project. However, you can use `npm`, `pnpm` or `yarn` as well.

### Setup

1. Clone the repository
2. Run `bun install` to install all the dependencies
3. Connect an android device or start an emulator with ADB (USB Debugging) enabled
4. Run `bun run android` to start the app. All changes will be reflected in real time.

### Building

1. Run `bun run build:android && ./android/gradlew build` to build the APK for android.
2. Output APK will be in `android/app/build/outputs/apk/debug/`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# 🚗 Vehicle Auction App

A React Native application for browsing and filtering vehicle auctions, built as a technical assessment for a React Native Developer position. 

## 📱 Demo

<!-- Add your video presentation here -->
- video_link

---

## 📋 Project Overview

This application loads and displays vehicle data from a large JSON dataset containing auction information.  Users can browse vehicles, filter results, mark favourites, and view detailed information about each vehicle.

## ✨ Features

- **Auction Countdown**: Each vehicle displays the number of days and hours until its auction begins
- **Favourites System**: Users can favourite/unfavourite vehicles with visual indication
- **Advanced Filtering**:
  - Filter by Make
  - Filter by Model
  - Filter by Starting Bid range
  - Show only favourite vehicles
- **Vehicle Details Page**: Click on any vehicle to view comprehensive details

## 🛠️ Tech Stack

- **React Native** 0.82.1
- **React** 19.1. 1
- **TypeScript** 5. 8.3
- **React Navigation** (Native Stack) - Navigation between screens
- **AsyncStorage** - Persistent storage for favourites
- **date-fns** - Date/time calculations for auction countdown
- **React Native Picker** - Filter dropdown components

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React Context for state management (VehicleDataProvider)
├── data/           # Vehicle JSON data
├── pages/          # Screen components
├── root/           # App root/navigation setup
├── tools/          # Utility functions
└── types/          # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)

### Installation

1. Clone the repository:
```bash
git clone https://github. com/maximdudai/cag_reactnative.git
cd cag_reactnative
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Install iOS pods (iOS only):
```bash
cd ios && pod install && cd ..
```

### Running the App

**Android:**
```bash
npm run android
```

**iOS:**
```bash
npm run ios
```

**Start Metro bundler:**
```bash
npm start
```

## 📊 Vehicle Data Properties

Each vehicle in the dataset contains:

| Property | Description |
|----------|-------------|
| Make | Vehicle manufacturer |
| Model | Vehicle model name |
| Engine Size | Engine capacity |
| Fuel Type | Type of fuel used |
| Year | Year of manufacture |
| Mileage | Total miles driven |
| Auction Date and Time | When the auction begins |
| Starting Bid | Initial bid amount |
| Favourite | User's favourite status |


## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run android` | Run on Android device/emulator |
| `npm run ios` | Run on iOS simulator |
| `npm start` | Start Metro bundler |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests |

---
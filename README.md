# CVE Details Web App

This is a web application built using React.js to display details of Common Vulnerabilities and Exposures (CVE). It fetches data from an API and presents it in a user-friendly format.

## Features

- Displays CVE details including ID, description, severity, scores, vector string, configurations, and references.
- Dynamically renders data fetched from the API.
- Provides a clean and organized user interface for easy readability.

## Technologies Used

- React.js
- JavaScript (ES6+)
- HTML
- CSS

![cvelist_page](./images/cvelist.png)

![cvedetails_page](./images/cvedetails.png)
## Getting Started

To run this project locally, follow these steps:

## Installation Guide

### Requirements
- [Nodejs](https://nodejs.org/en/download)
- [Mongodb](https://www.mongodb.com/docs/manual/administration/install-community/)

Both should be installed and make sure mongodb is running.
1. Clone the repository:
```shell
git clone https://github.com/sampath-code04/securin-nvd-cve.git
```

2. Navigate to the project directory:
```shell
cd securin-nvd-cve
```

3. Install dependencies:
```shell
npm install
```

4. Start the development server:
```shell
npm start
```

5. Open your browser and visit `http://localhost:5000/fetch-data` to fetch the data from API call.

6. Open your browser and visit `http://localhost:3000/cves/list` to view the application.

## API Used

This project fetches data from the National Vulnerability Database (NVD) API to retrieve CVE details. You can find more information about the API [here](https://nvd.nist.gov/developers/vulnerabilities).

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
